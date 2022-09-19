import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf'
import helmet from "helmet";
import {ValidationPipe} from "@nestjs/common";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)
    app.enableCors()

    const config = new DocumentBuilder()
        .setTitle('Back-end tender project')
        .setDescription('Documentation of REST API')
        .setVersion('1.0.0')
        .addTag('Azim')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)


    app.useGlobalPipes(new ValidationPipe({whitelist:true}))
    app.use(helmet())
    app.use(cookieParser())


    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()
