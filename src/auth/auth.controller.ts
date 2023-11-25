import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Res,
} from '@nestjs/common';
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

  @Get('duplicate')
  async duplicate(@Query('compareId') id: string): Promise<ResponseBody> {
    return await this.authService.duplicate(id);
  }
}
