import { Injectable } from "@nestjs/common";
import { Profile } from "./profile.model";
import { InjectModel } from "@nestjs/sequelize";
import { createProfileDto } from "./dto/create.profile.dto";
import { User } from "src/users/users.model";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async createProfile(dto: createProfileDto) {
    const profile = await this.profileRepository.create(dto);
    return profile;
  }

  async updateProfile(dto: createProfileDto) {
    const profile = await this.profileRepository.findByPk(dto.id);
    for (let key in dto) {
      if (dto[key] && key !== "id") {
        profile[key] = dto[key];
      }
    }
    await profile.save();
    const user = await this.userRepository.findByPk(dto.id, {
      include: { all: true },
    });
    return user;
  }
}
