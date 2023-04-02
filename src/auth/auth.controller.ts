import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RegDto } from './dto/reg.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService) {

    }
    @Post('/login')
    login(@Body() userDto: createUserDto) {
        return this.authService.login(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() regDto: RegDto) {
        return this.authService.registration(regDto)
    }

}
