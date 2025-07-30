import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { PasswordConfirmationPipe } from './pipes/password-confirmation/password-confirmation.pipe';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Registers a new User'
  })
  @Post('signup')
  signup(@Body(PasswordConfirmationPipe) signupDto: SignupDto) {
    return this.authService.register(signupDto);
  }

  @ApiOperation({
    summary: 'Signs in an User with the required credentials'
  })
  @ApiResponse({
    status: 200,
    description: 'The user information',
    type: LoginResponseDto
  })
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }  
}
