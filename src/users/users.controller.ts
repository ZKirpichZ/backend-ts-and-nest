import { Controller, Post, Body, Get, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles-guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { createUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: createUserDto) {
    return this.usersService.createUser(userDto);
  }
  @Roles("Admin")
  
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto:AddRoleDto) {
    return this.usersService.addRole(dto);
  }
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto:AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
