
import { IsDefined, IsNotEmpty, IsString, NotContains } from "class-validator";

export class сreateGroupDto {

  @IsNotEmpty()
  @NotContains(' ', { message: "Без пробела" })
  @IsString()
  @IsDefined()
  name: string

}