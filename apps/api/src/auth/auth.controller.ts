import {Body, Controller, Get, Post, Put, Req, Res, UseGuards} from '@nestjs/common';
import type { Response } from 'express';
import { AuthenticatedRequest } from '../types/auth.types';
import {AuthService} from './auth.service';
import { CustomerSignupDto } from './dtos/customerSignUp.dto';
import { LoginDTO } from './dtos/login.dto';
import { RefreshTokensDTO } from './dtos/refresh.dto';
import { ChangePasswordDTO } from './dtos/change-password.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { GoogleAuthGuard } from './guards/google-auth.guards';
import { FixerSignupDto } from './dtos/fixerSignup.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('customer-signup')
  @ApiOperation({ summary: 'Customer registration' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  async customerSignup(@Body() signupData: CustomerSignupDto){
    return this.authService.customerSignup(signupData);
  }


  @Post('fixer-signup')
  @ApiOperation({ summary: 'Customer registration' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  async fixerSignup(@Body() signupData: FixerSignupDto){
    return this.authService.fixerSignup(signupData);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() credentials: LoginDTO) {
    return this.authService.login(credentials);
  }


  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokensDTO) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }


  @UseGuards(AuthGuard)
  @Put('change-password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(@Body() changePasswordDto: ChangePasswordDTO, @Req() req) {
    return this.authService.changePassword(req.userId, changePasswordDto);
  }


  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }


  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    return this.authService.resetPassword(resetPasswordDto.newPassword, resetPasswordDto.resetToken);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.userId);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(@Body() updateData: UpdateProfileDto, @Req() req) {
    return this.authService.updateProfile(req.userId, updateData);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ 
    summary: 'Initiate Google OAuth2 authentication',
    description: 'Redirects to Google for authentication',
  })
  @ApiResponse({ 
    status: 302, 
    description: 'Redirect to Google for authentication' })
  async googleAuth(@Req() req) {

  }


  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const { accessToken, refreshToken, user} = await this.authService.googleLogin(req.user);

      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const userData = encodeURIComponent(JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType || 'customer'
      }));
      res.redirect(`${frontendUrl}/auth/google/success?token=${accessToken}&refreshToken=${refreshToken}&user=${userData}`);
    } catch (error) {
      console.error('Google auth error:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/login?error=Authentication failed`);
    }
  }
}
