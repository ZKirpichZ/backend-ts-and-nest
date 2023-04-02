import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    forwardRef(() => AuthModule)
  ],
  exports: [ProfileService]
})
export class ProfileModule {}
