import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Group } from "../group/group.model";

interface IBlockCreation {
  blockName: string;
  title: string;
  content: string;
  image: string;
  groupId: number;
}

@Table({ tableName: "textblock" })
export class TextBlock extends Model<TextBlock, IBlockCreation> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  blockName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  image: string;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: null })
  groupId: number;

  @BelongsTo(() => Group)
  group: Group;
}
