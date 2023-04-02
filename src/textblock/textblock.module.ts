import { forwardRef, Module } from '@nestjs/common';
import { TextblockService } from './textblock.service';
import { TextblockController } from './textblock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextBlock } from './textblock.model';
import { Group } from 'src/group/group.model';
import { FilesModule } from 'src/files/files.module';
import { GroupModule } from 'src/group/group.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TextblockService],
  controllers: [TextblockController],
  imports: [
    SequelizeModule.forFeature([TextBlock, Group]),
    forwardRef(() => AuthModule),
    FilesModule,
    GroupModule
  ]
})
export class TextblockModule {}
