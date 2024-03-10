import { __dirname } from "./get-dirname";
import fs from "fs";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getFilePath } from "./get-file-path";

@ValidatorConstraint({ name: 'file-size-validator', async: false })
export class FileSize implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        const filePath = getFilePath(text);
        var stats = fs.statSync(filePath);
        var fileSizeInBytes = stats.size;
        // Convert the file size to megabytes
        var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
        if (fileSizeInMegabytes > 10) return false;
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Image size more then 10Mb';
    }
}