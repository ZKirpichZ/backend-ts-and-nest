import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { TextBlock } from "src/textblock/textblock.model";

interface IGroupCreation {
  name: string;
}

@Table({ tableName: "groups" })
export class Group extends Model<Group, IGroupCreation> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => TextBlock)
  blocks: TextBlock[];
}
