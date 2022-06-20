import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Post} from "./posts.model";

interface imageCreateAttrs{
    postId: number;
    image: string;
}

@Table({tableName: 'images', timestamps:true})
export class Images extends Model<Images, imageCreateAttrs> {
    // comment 1235678
    @ApiProperty({example: '1', description: 'Post id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER})
    postId: number;

    @BelongsTo(() => Post)
    post: Post;
}
