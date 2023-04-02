import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { сreateGroupDto } from "./dto/create-group.dto";
import { deleteGroupDto } from "./dto/delete.group.dto";
import { updateGroupDto } from "./dto/update-group.dto";
import { Group } from "./group.model";

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private readonly groupRepository: typeof Group
  ) {}

  async getGroupByName(searchedGroup) {
    const groups = await this.groupRepository.findAll({
      include: { all: true },
      where: { name: searchedGroup },
    });
    return groups;
  }

  async getAllGroups() {
    const groups = await this.groupRepository.findAll({
      include: { all: true },
    });
    return groups;
  }

  async createGroup(dto: сreateGroupDto) {
    try {
      const group = await this.groupRepository.create(dto);
      return group;
    } catch (err) {
      throw new HttpException("Поменяй название", HttpStatus.BAD_REQUEST);
    }
  }

  async updateGroupName(dto: updateGroupDto) {
    const group = await this.groupRepository.findByPk(dto.id);
    if (!group) {
      throw new HttpException("Нет такого id", HttpStatus.BAD_REQUEST);
    }
    group.name = dto.name;
    await group.save();
  }

  async deleteGroup(dto: deleteGroupDto) {
    for (let id of dto.idArray) {
      await this.groupRepository.destroy({ where: { id: id } });
    }
  }

  async findGroupById(id: number) {
    const group = await this.groupRepository.findByPk(id);
    return group;
  }
}
