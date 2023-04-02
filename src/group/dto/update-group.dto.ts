
import { IsDefined, IsNotEmpty, IsNumber, IsString, NotContains } from "class-validator";

export class updateGroupDto {

  @IsNumber()
  @IsDefined()

  readonly id: number

  @IsNotEmpty()
  @NotContains(' ', { message: "Без пробела" })
  @IsString()
  @IsDefined()
  readonly name: string

}