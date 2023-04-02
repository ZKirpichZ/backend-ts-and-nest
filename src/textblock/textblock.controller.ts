import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { AdminGuard } from "src/profile/is-admin.guard";
import { TextblockService } from "./textblock.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { updateTextBlockDto } from "./dto/update-textblock.dto";
import { createTextBlockDto } from "./dto/create-textblock.dto";
import { deleteTextBlockDto } from "./dto/delete-textblock.dto";

@Controller("textblock")
export class TextblockController {
  constructor(private readonly textblockService: TextblockService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @UsePipes(ValidationPipe)
  @Put()
  @UseInterceptors(FileInterceptor("image"))
  updateBlock(@Body() dto: updateTextBlockDto, @UploadedFile() image) {
    const block = this.textblockService.updateBlock(dto, image);
    return block;
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(":blockName")
  getBlock(@Param("blockName") blockName: string) {
    console.log(blockName);
    const block = this.textblockService.getBlock(blockName);
    return block;
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @UsePipes(ValidationPipe)
  @Delete()
  deleteGroup(@Body() dto: deleteTextBlockDto) {
    this.textblockService.deleteBlock(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createBlock(@Body() dto: createTextBlockDto, @UploadedFile() image) {
    const block = this.textblockService.createBlock(dto, image);
    return block;
  }
}
