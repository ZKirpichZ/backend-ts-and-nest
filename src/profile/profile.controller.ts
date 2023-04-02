import { Body, Controller, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { createProfileDto } from "./dto/create.profile.dto";
import { AdminGuard } from "./is-admin.guard";
import { ProfileService } from './profile.service';

@Controller('/user/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }
   
    @UseGuards(JwtAuthGuard, AdminGuard)
    @UsePipes(ValidationPipe)
    @Put('/admin')
    updateProfileById(@Body() profileDto: createProfileDto): any {
      return this.profileService.updateProfile(profileDto);
    }
}
