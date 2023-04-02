import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface ProfileCreationAttrs {

	id: number
	firstName: string,
	lastName: string,
	phone: string,
	birthday: string,
	isAdmin: boolean,

}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {

	@ForeignKey(() => User)
	@Column({type: DataType.INTEGER, unique: true, primaryKey: true})
	id: number;


	@Column({type: DataType.STRING, allowNull: true, defaultValue: null})
	firstName: string;


	@Column({type: DataType.STRING, allowNull: true, defaultValue: null})
	lastName: string;


	@Column({type: DataType.STRING, allowNull: true, defaultValue: null})
	phone: string;


	@Column({type: DataType.DATE, allowNull: true, defaultValue: null})
	birthday: string;


	@Column({type: DataType.BOOLEAN, defaultValue: false})
	isAdmin: boolean;

	@BelongsTo(() => User)
	user: User

}