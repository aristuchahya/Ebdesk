import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  loginSchema,
  RegisterDto,
  registerSchema,
} from './dto/create-auth.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { Public } from 'src/common/decorator/public/public.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Register successfully' })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerSchema)) registerDto: RegisterDto,
  ) {
    return await this.authService.register(registerDto);
  }

  @ApiResponse({ status: 200, description: 'Login successfully' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
