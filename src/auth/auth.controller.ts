import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signin')
  async singin(@Body() authcredentialDto: AuthCredentialDto) {
    return this.authService.login(authcredentialDto);
  }
}
