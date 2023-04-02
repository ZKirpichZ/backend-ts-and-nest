import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";

export class updateTextBlockDto {
  @Transform(({ value }: TransformFnParams) => +value)
  @IsNumber()
  @IsDefined()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  blockName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  image: string;

  @Transform(({ value }: TransformFnParams) => +value)
  @IsNumber()
  @IsOptional()
  groupId: number;
}
