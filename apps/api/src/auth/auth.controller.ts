import {Body, Controller, Post, Put, Req, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import { SignupDTO } from './dtos/signupdto';
import { LoginDTO } from './dtos/login.dto';
import { RefreshTokensDTO } from './dtos/refresh.dto';
import { ChangePasswordDTO } from './dtos/change-password.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupData: SignupDTO){
    return this.authService.signup(signupData);
  }
  @Post('login')
  async login(@Body() credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokensDTO) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDTO, @Req()req) {
    return this.authService.ChangePassword(req.userId, changePasswordDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    return this.authService.resetPassword(resetPasswordDto.newPassword, resetPasswordDto.resetToken);
  }
}
