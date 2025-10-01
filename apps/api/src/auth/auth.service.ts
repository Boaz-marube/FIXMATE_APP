import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CustomerSignupDto } from './dtos/customerSignUp.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schema/refresh-token.schema';
import { ChangePasswordDTO } from './dtos/change-password.dto';
import { nanoid } from 'nanoid';
import { ResetToken } from './schema/reset-token.schema';
import { MailService } from 'src/services/mail.service';
import { FixerSignupDto } from './dtos/fixerSignup.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';


@Injectable()
export class AuthService {
  constructor (
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>,
    @InjectModel(ResetToken.name) private ResetTokenModel: Model<ResetToken>,
    private jwtService: JwtService,
    private mailService: MailService,
  ){}

  async customerSignup(signupData: CustomerSignupDto) {
    const {email, password, name, phoneNumber, address} = signupData;
    const existingUser = await this.UserModel.findOne({email}); 
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.UserModel.create({
      email, 
      password: hashedPassword, 
      name, 
      phoneNumber, 
      address: address || 'Not provided',
      userType: 'customer'
    });
  }

  async fixerSignup(signupData: FixerSignupDto) {
    const {email, password, name, phoneNumber, skills, experienceYears, serviceArea, nationalId, description} = signupData;
    const existingUser = await this.UserModel.findOne({email}); 
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.UserModel.create({
      email, 
      password: hashedPassword, 
      name, 
      phoneNumber, 
      address: serviceArea, // Use serviceArea as address for fixers
      skills,
      experienceYears,
      serviceArea,
      nationalId,
      description,
      userType: 'fixer'
    });
  }



  async login(credentials: LoginDTO) {
    const {email, password} = credentials;
    const user = await this.UserModel.findOne({email});
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateUserTokens(user._id);

    return {
        ...tokens,
        userId: user._id,
        userType: user.userType,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        }
    }
  }


  async refreshTokens(refreshToken: string){
    const token = await this.RefreshTokenModel.findOne({token: refreshToken,
        expiresAt: {$gt: new Date()}
    });
    if(!token){
        throw new UnauthorizedException('Invalid refresh token');
    }
    return this.generateUserTokens(token.userId);
  }


  async generateUserTokens(userId){
    const accessToken = this.jwtService.sign({userId},{expiresIn: '1h'});
    const { v4: uuidv4 } = await import('uuid');
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, userId);
    return {accessToken, refreshToken};

  }


  async storeRefreshToken(token: string, userId){
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 2);
    await this.RefreshTokenModel.updateOne({userId},{$set: {expiresAt, token}},{
        upsert: true
    }
    );
  }


  async changePassword(userId: string, changePasswordDto: ChangePasswordDTO){
    const {oldPassword, newPassword} = changePasswordDto;
    const user = await this.UserModel.findById(userId);
    if(!user){
        throw new BadRequestException('User not found');
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if(!passwordMatch){
        throw new UnauthorizedException('Invalid credentials');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  }


  async forgotPassword(email: string){
    const user = await this.UserModel.findOne({email});
    if(user){
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1)
      const resetToken = nanoid(64)  
      await this.ResetTokenModel.create({token: resetToken,
      userId: user._id,
      expiresAt
      });
      this.mailService.sendPasswordResetEmail(email, resetToken)
    }
    return {message: 'If this user exists, they will receive an email'};
  }

  async logout(refreshToken: string){
    await this.RefreshTokenModel.deleteOne({token: refreshToken});
  }


  async resetPassword(newPassword: string, resetToken: string){
    const token = await this.ResetTokenModel.findOneAndDelete({token: resetToken,
        expiresAt: {$gt: new Date()}
    });
    if(!token){
        throw new UnauthorizedException('Invalid reset token');
    }
    const user = await this.UserModel.findById(token.userId);
    if(!user){
        throw new BadRequestException('User not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    // await this.ResetTokenModel.deleteOne({token: resetToken});
  }

  async getProfile(userId: string) {
    const user = await this.UserModel.findById(userId).select('-password');
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async updateProfile(userId: string, updateData: UpdateProfileDto) {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Check if email is being changed and if it already exists
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.UserModel.findOne({ email: updateData.email });
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
    }

    Object.assign(user, updateData);
    await user.save();
    
    // Return user without password
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  async googleLogin(googleUser: any) {
    const { email, firstName, lastName } = googleUser;
    
    // Ensure names are strings, not undefined
    const safeFirstName = firstName || '';
    const safeLastName = lastName || '';
    
    // Check if user exists
    let user = await this.UserModel.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      const hashedPassword = await bcrypt.hash(Math.random().toString(36), 10);
      const fullName = safeLastName ? `${safeFirstName} ${safeLastName}` : safeFirstName;
      
      user = await this.UserModel.create({
        name: fullName.trim(),
        email,
        password: hashedPassword,
        phoneNumber: 'Not provided',
        address: 'Not provided',
        userType: 'customer'
      });
    }
    
    // Generate tokens
    const tokens = await this.generateUserTokens(user._id);
    return {
      ...tokens,
      userId: user._id,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    };
  }
}
