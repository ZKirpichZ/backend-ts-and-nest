import { IsArray, IsNumber, ArrayNotEmpty } from "class-validator";

export class deleteTextBlockDto {
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  @IsArray()
  readonly idArray: Array<number>;
}
