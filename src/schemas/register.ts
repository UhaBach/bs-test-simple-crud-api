import { IsAlpha, IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class Register {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

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