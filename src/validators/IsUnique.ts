import { AppDataSource } from "@/database/data-source"
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator"
import { Not } from "typeorm"

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  public defaultMessage(): string {
    return `$property is already used.`
  }
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entity, field] = args.constraints
    const repository = AppDataSource.getRepository(entity)

    const isUpdate = args.object["id"] !== undefined
    let count = 0

    if (!isUpdate) {
      count = await repository.count({ where: { [field]: value } })
    } else {
      count = await repository.count({ where: { [field]: value, id: Not(args.object["id"]) } })
    }

    return count <= 0
  }
}

export function IsUnique(entity: any, field: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, field],
      validator: IsUniqueConstraint,
    })
  }
}
