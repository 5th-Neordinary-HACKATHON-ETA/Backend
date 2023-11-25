import { IsString } from 'class-validator';

export class JoinDto {
  @IsString()
  id!: string;

  @IsString()
  nickname!: string;

  @IsString()
  //@Matches(/^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
  //  message:
  //    'Password must be at least 8 characters(en) long, contain 1 number',
  //})
  password!: string;
}
