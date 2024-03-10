import { __dirname } from "./get-dirname";
import fs from "fs";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getFilePath } from "./get-file-path";

@ValidatorConstraint({ name: 'file-exist-validator', async: false })
export class FileExist implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        const filePath = getFilePath(text);
        if (!fs.existsSync(filePath)) return false;
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'The file does not exist';
    }
}