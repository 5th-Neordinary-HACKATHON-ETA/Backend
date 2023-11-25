import { IsNumber, IsString } from 'class-validator';

export class CreateDto {
  // 여기서는 create API를 호출했을 때 꼭 넘어와야 할 body 값들을 명시해주는 장소임.
  @IsString()
  teamId!: string;

  @IsString()
  name!: string;

  @IsNumber()
  duration!: number;

  @IsString()
  location!: string;
}
