import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;
}
