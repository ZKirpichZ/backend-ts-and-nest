import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { AdminGuard } from "src/profile/is-admin.guard";
import { сreateGroupDto } from "./dto/create-group.dto";
import { deleteGroupDto } from "./dto/delete.group.dto";
import { updateGroupDto } from "./dto/update-group.dto";
import { GroupService } from "./group.service";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  getAllGroups() {
    const groups = this.groupService.getAllGroups();
    return groups;
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(":searchG")
  getGroupByName(@Param("searchG") searchG: string) {
    const groups = this.groupService.getGroupByName(searchG);
    return groups;
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @UsePipes(ValidationPipe)
  @Put()
  updateGroupName(@Body() dto: updateGroupDto) {
    const groups = this.groupService.updateGroupName(dto);
    return groups;
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @UsePipes(ValidationPipe)
  @Delete()
  deleteGroup(@Body() dto: deleteGroupDto) {
    this.groupService.deleteGroup(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createGroup(@Body() dto: сreateGroupDto) {
    const group = this.groupService.createGroup(dto);
    return group;
  }
}
