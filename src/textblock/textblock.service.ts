import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "src/files/files.service";
import { GroupService } from "src/group/group.service";
import { createTextBlockDto } from "./dto/create-textblock.dto";
import { deleteTextBlockDto } from "./dto/delete-textblock.dto";
import { updateTextBlockDto } from "./dto/update-textblock.dto";
import { TextBlock } from "./textblock.model";

@Injectable()
export class TextblockService {
  constructor(
    @InjectModel(TextBlock) private readonly blockRepository: typeof TextBlock,
    private readonly filesService: FilesService,
    private readonly groupService: GroupService
  ) {}

  async createBlock(dto: createTextBlockDto, image) {
    const group = await this.groupService.findGroupById(+dto.groupId);
    const eqBlock = await this.blockRepository.findOne({
      where: { blockName: dto.blockName },
    });

    if (!group) {
      throw new HttpException(
        "Группа с таким id существует",
        HttpStatus.BAD_REQUEST
      );
    }

    if (eqBlock) {
      throw new HttpException(
        "Блок с таким именем существует",
        HttpStatus.BAD_REQUEST
      );
    }

    let imageName: string | undefined;
    if (image) {
      imageName = await this.filesService.createFile(image);
    }

    const block = await this.blockRepository.create({
      ...dto,
      image: imageName,
    });

    return block;
  }

  async deleteBlock(dto: deleteTextBlockDto) {
    for (let id of dto.idArray) {
      await this.blockRepository.destroy({ where: { id: id } });
    }
  }

  async updateBlock(dto: updateTextBlockDto, image) {
    if (dto.groupId) {
      const group = await this.groupService.findGroupById(+dto.groupId);

      if (!group) {
        throw new HttpException("Введи id правильно", HttpStatus.BAD_REQUEST);
      }
    }

    const block = await this.blockRepository.findByPk(+dto.id);
    if (!block) {
      throw new HttpException("Такого id нет", HttpStatus.BAD_REQUEST);
    }

    if (image) {
      const imageName = await this.filesService.createFile(image);
      block.image = imageName;
    }

    for (let key in dto) {
      if (dto[key] && key !== "id") {
        block[key] = dto[key];
      }
    }

    await block.save();
  }

  async getBlock(blockName: string) {
    const block = await this.blockRepository.findAll({
      include: { all: true },
      where: { blockName: blockName },
    });
    return block;
  }
}
