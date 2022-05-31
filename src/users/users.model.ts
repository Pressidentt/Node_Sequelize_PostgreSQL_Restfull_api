import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'User;s id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;


    @ApiProperty({example: 'user@mail.ru', description: 'User;s mail'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;


    @ApiProperty({example: '12345678', description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Is user banned'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Hooliganism', description: 'The reason of ban'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;


    @ApiProperty({example: 'Silvia', description: 'Name, part of profile'})
    @Column({type: DataType.STRING, allowNull: true})
    name: string;

    @ApiProperty({example: 'Silvia', description: 'Surname, part of profile'})
    @Column({type: DataType.STRING, allowNull: true})
    surname : string;

    @ApiProperty({example: '18', description: 'Age of user, min:18, part of profile'})
    @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 18})
    age : number;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
}
