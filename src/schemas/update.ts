import { IsAlpha, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { FileExtension } from "../utils/file-extension-validator";
import { FileExist } from "../utils/file-exist-validator";
import { FileSize } from "../utils/file-size-validator";

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

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @Validate(FileExtension)
    @Validate(FileExist)
    @Validate(FileSize)
    photo: string;
}

// enum Gender{
//     MALE = "Male",
//     FEMALE = "Female"
// }