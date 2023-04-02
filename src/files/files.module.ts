import { forwardRef, Module } from "@nestjs/common";

import { AuthModule } from "src/auth/auth.module";

import { TextblockModule } from "src/textblock/textblock.module";
import { FilesService } from "./files.service";

@Module({
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
