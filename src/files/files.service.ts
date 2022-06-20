import {HttpException, HttpStatus, Injectable, StreamableFile} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';
import {PostsService} from "../posts/posts.service";
import {createReadStream} from "fs";
import {join} from "path";

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createMultipleFiles(files: Express.Multer.File[]) {
        const fileNames: string[] = [];
        for (const file of files) {
            const fileName: string = await this.createFile(file);
            fileNames.push(fileName);
        }

        console.log(fileNames);
        return fileNames;
    }

    async getFile(filename:string): Promise<StreamableFile> {
        const file = createReadStream(join(__dirname,'..','static',filename));
        return new StreamableFile(file);

    }

}
