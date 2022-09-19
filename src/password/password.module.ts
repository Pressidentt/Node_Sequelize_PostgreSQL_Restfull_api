import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {PasswordReset} from "./password.model";
import {User} from "../users/users.model";

@Module({

  imports:[
      SequelizeModule.forFeature([PasswordReset, User])
    //MailerModule.forRoot({
    //  transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    //  defaults: {
    //    from: '"nest-modules" <modules@nestjs.com>',
    //  },
    //  template: {
     //   dir: __dirname + '/templates',
     //   adapter: new EjsAdapter(),
     //   options: {
       //   strict: true,
       // },
     // },
   // }),
  ],

  providers: [PasswordService],
  controllers: [PasswordController]

})
export class PasswordModule {}
