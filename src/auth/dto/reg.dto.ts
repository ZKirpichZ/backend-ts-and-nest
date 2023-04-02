import { IsDefined, IsNotEmpty, IsString, Length } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class RegDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  readonly password: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly phone: string;

  readonly birthday: string;

  readonly isAdmin: boolean;
}
