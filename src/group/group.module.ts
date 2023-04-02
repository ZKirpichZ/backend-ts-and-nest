import { forwardRef, Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Group } from "./group.model";
import { AuthModule } from "src/auth/auth.module";
import { TextBlock } from "src/textblock/textblock.model";

@Module({
  providers: [GroupService],
  controllers: [GroupController],
  imports: [
    SequelizeModule.forFeature([TextBlock, Group]),
    forwardRef(() => AuthModule),
  ],
  exports: [GroupService],
})
export class GroupModule {}
