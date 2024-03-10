import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'file-extension-validator', async: false })
export class FileExtension implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text.endsWith(".jpg") || text.endsWith(".png");
  }

  defaultMessage(args: ValidationArguments) {
    return "The file must be in the format \".jpg\" or \".png\"";
  }
}