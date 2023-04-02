import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as fs from "fs";
import * as path from "path";
import { TextBlock } from "src/textblock/textblock.model";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  MAX_IMAGES: number = 5;
  STATIC_PATH: string = path.resolve(__dirname, "..", "static");

  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + ".jpg";

      if (!fs.existsSync(this.STATIC_PATH)) {
        fs.mkdirSync(this.STATIC_PATH, { recursive: true });
      }

      fs.writeFileSync(path.join(this.STATIC_PATH, fileName), file.buffer);

      return fileName;
    } catch (err) {
      throw new HttpException(
        "Ошибка при записи файла",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteFIle(name: string) {
    try {
      const filePath = path.resolve(__dirname, "..", "static");
      fs.unlinkSync(filePath + "/" + name);
    } catch (err) {}
  }
}
