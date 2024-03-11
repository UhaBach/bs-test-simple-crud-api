import { IsAlpha, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class Update {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    secondName: string;

    @IsDefined()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    email: string;

    @IsDefined()
    @IsEnum({ MALE: "Male", FEMALE: "Female" })
    gender: string;
}

// enum Gender{
//     MALE = "Male",
//     FEMALE = "Female"
// }