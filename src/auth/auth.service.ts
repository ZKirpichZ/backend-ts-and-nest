import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import { createUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bycrypt from "bcryptjs";
import { User } from "src/users/users.model";
import { RegDto } from "./dto/reg.dto";
import { createProfileDto } from "src/profile/dto/create.profile.dto";
import { ProfileService } from "src/profile/profile.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private JwtService: JwtService,
    private profileService: ProfileService,
  ) {}

  async login(userDto: createUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(regDto: RegDto) {
    const user = await this.userService.getUserByEmail(regDto.email);

    if (user) {
      throw new HttpException(
        "User with this login already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    const { email, password, firstName, lastName, phone, birthday, isAdmin } =
      regDto;

    const hashPassword = await bycrypt.hash(password, 5);
    const CreateUserDto: createUserDto = {
      email: email,
      password: hashPassword,
    };

    const newUser = await this.userService.createUser(CreateUserDto);

    const CreateProfileDto: createProfileDto = {
      id: +newUser.id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      birthday: birthday,
      isAdmin: isAdmin,
    };

    console.log(CreateProfileDto);

    const newProfile = await this.profileService.createProfile(
      CreateProfileDto
    );

    const createdUser = await this.userService.getUserByEmail(email);

    return this.generateToken(createdUser);
  }
  private async generateToken(user: User) {
    const payLoad = { email: user.email, id: user.id, roles: user.roles, profile:user.profile };
    return {
      token: this.JwtService.sign(payLoad),
    };
  }

  private async validateUser(userDto: createUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bycrypt.compare(
      userDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: "Ну ты выдал конечно, проверь пароль и email",
    });
  }
}
