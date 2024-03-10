import { IsDefined, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class Login {
    @IsDefined()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    password: string;
}