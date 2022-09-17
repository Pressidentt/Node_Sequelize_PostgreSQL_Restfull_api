import { Injectable } from '@nestjs/common';
import {PasswordResetDto} from "../users/dto/password-reset.dto";
import {InjectModel} from "@nestjs/sequelize";
import {PasswordReset} from "./password.model";
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class PasswordService {
    constructor(@InjectModel(PasswordReset) private passwordRepository:typeof PasswordReset,
                private readonly mailerService: MailerService) {}

   async createUser(dto : PasswordResetDto) {
      return await this.passwordRepository.create(dto)
   }

   async reset_password(dto: PasswordResetDto) {

   }


}
