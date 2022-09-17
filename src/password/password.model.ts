import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface PassCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'password_reset'})
export class PasswordReset extends Model<PasswordReset, PassCreationAttrs> {
    @ApiProperty({example: '1', description: 'User;s id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'User;s mail'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345678', description: 'user token'})
    @Column({type: DataType.STRING, allowNull: false})
    token: string;
}