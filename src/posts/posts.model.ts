import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Images} from "./images.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({tableName: 'posts', timestamps:true})
export class Post extends Model<Post, PostCreationAttrs> {
    // comment 1235678
    @ApiProperty({example: '1', description: 'Post id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Searching for metal supplier for our company', description: 'Title of post, should be between 5 and 60 symbols'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: 'Not mentioned / 23', description: 'Price tag for the post'})
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    price: number;

    @ApiProperty({example: 'Searching for metal supplier for our company and much more...', description: 'The content part of post should consist of 5 - 700 sybmols'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @HasMany(() => Images)
    images: Images[];
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User;
}
