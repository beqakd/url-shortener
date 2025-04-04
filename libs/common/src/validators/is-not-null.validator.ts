import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsNotNull', async: false })
export class IsNotNullConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    // Check if value is a non-empty string
    return value !== null && value !== undefined && value !== '';
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should not be empty or null`;
  }
}

export function IsNotNull(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotNullConstraint,
    });
  };
}
