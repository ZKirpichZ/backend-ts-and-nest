import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class createTextBlockDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  blockName: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  content: string;

  @IsOptional()
  image: string;

  @Transform(({ value }: TransformFnParams) => +value)
  @IsNumber()
  @IsDefined()
  groupId: number;
}
