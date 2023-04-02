import {IsString, IsNumber } from "class-validator";


export class AddRoleDto {
    @IsString({message: 'Строка'})
    readonly value: string;
    @IsNumber({}, {message: 'Число'})
    readonly userId: number;
}