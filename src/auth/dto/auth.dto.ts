import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;
  
  firstName: string;
  lastName: string;

  @IsNotEmpty()
  password: string;
}
