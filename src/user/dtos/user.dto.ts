import { Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
