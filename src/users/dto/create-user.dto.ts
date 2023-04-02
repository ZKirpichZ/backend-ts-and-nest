import { IsEmail, IsString, Length } from "class-validator";



export class createUserDto {
    @IsString({message: 'Строка'})
    @IsEmail({}, {message:'Введи норм email!'})
    readonly email:string;
    @IsString({message: 'Строка'})
    @Length(4, 16, {message:' Пароль должен быть не меньше 4 и не больше 16!'})
    readonly password:string;
}