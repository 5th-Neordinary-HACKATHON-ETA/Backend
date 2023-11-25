import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JoinDto } from './dtos/request/join.dto';
import { ResponseBody } from '../common/response/response';
import { LoginDto } from './dtos/request/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/join')
  async join(@Body() joinDto: JoinDto): Promise<ResponseBody> {
    return await this.authService.join(joinDto);
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ResponseBody> {
    return await this.authService.login(loginDto, response);
  }

  //@Post('test')
  //@UseGuards(JwtAuthGuard) //이걸 통해서 jwt를 검증하고 req.user에 user를 넣어준다.
  //hello(@AuthUser() user: User) {
  //  //AuthUser() 데코레이터를 통해서 req.user(실질적인 user)를 가져온다.
  //  console.log(user);
  //}
}
