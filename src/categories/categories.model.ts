import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Images} from "../posts/images.model";
import {User} from "../users/users.model";
import {Post} from "../posts/posts.model";

interface CategoriesCreationAttrs{
    title: string;
}

@Table({tableName: 'categories', timestamps:true})
export class Categories extends Model<Categories, CategoriesCreationAttrs> {
    // comment 1235678
    @ApiProperty({example: '1', description: 'Post id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Searching for metal supplier for our company', description: 'Title of post, should be between 5 and 60 symbols'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @HasMany(() => Post)
    posts : Post[];

}
