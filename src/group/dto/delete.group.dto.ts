
import { IsArray, IsNumber, ArrayNotEmpty } from "class-validator";

export class deleteGroupDto {

  @IsNumber({}, {each: true})
  @ArrayNotEmpty()
  @IsArray()
  readonly idArray: Array<number>;

}