import { IsString, IsEmail, Matches, MinLength, MaxLength, IsNotEmpty } from 'class-validator'

export class UserDTO {
    @IsEmail()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid Email address' })
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(10)
    password: string;
}