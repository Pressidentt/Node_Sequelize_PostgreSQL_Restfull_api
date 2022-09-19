import {ForbiddenException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PasswordResetDto} from "../users/dto/password-reset.dto";
import {InjectModel} from "@nestjs/sequelize";
import {PasswordReset} from "./password.model";
import {User} from "../users/users.model";
import * as bcrypt from 'bcryptjs'
import {UserResetDto} from "./dto/user-reset.dto";
import * as uuid from 'uuid'
import * as nodemailer from 'nodemailer'
import {google} from 'googleapis'

let CLIENT_ID = process.env.CLIENT_ID
let CLIENT_SECRET = process.env.CLIENT_SECRET
let REDIRECT_URL = process.env.REDIRECT_URL
let REFRESH_TOKEN = process.env.REFRESH_TOKEN
let oauth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})


@Injectable()
export class PasswordService {
    constructor(@InjectModel(PasswordReset) private passwordRepository:typeof PasswordReset,
               // private readonly mailerService: MailerService,
                @InjectModel(User) private userRepository: typeof User
    ) {}

    async send_email(clientEmail:string,html_code:any) {
       try {
            let accessToken = await oauth2Client.getAccessToken()
           let transport = nodemailer.createTransport({
               service : 'gmail',
               auth: {
                   type: 'OAuth2',
                   user: 'ttender.dev@gmail.com',
                   clientId : CLIENT_ID,
                   clientSecret : CLIENT_SECRET,
                   refreshToken: REFRESH_TOKEN,
                   accessToken:accessToken
               }

           })
          let mailOptions = {
                from :  " TTender support <ttender.dev@gmail.com> ",
              to: `${clientEmail}`,
              subject: 'Password Recovery',
                text : 'Some test text',
              html :  `${html_code}`
          }
           return await transport.sendMail(mailOptions)
       }
       catch (e) {
           return e
       }

    }



   async reset_password(dto: UserResetDto) {
       const token = uuid.v4()
      let real_user = await this.userRepository.findOne({where:{email:dto.email}})
       if(real_user) {
           dto.token = token
            console.log(dto.email, token)
           let user = await this.passwordRepository.create(dto)
           let front_url = 'localhost:3000/reset/'+token
           let html_send = ` <h1> Click <a href="${front_url}"> here </a> to reset your password <br> 5 часов ушли не зря </h1>`
           let result = await this.send_email(dto.email,html_send)

           return {
               message:'You can check your email'
           }
       }
       throw new HttpException('New password cant equal the old one.',HttpStatus.BAD_REQUEST);
   }
    async changePassword(dto: PasswordResetDto, token_fromurl:string) {
        let changed_password
        const user_real= await this.passwordRepository.findOne({where:{token:token_fromurl}})
        if (!user_real){
           throw new ForbiddenException('denied')
        }
        const user = await this.userRepository.findOne({where:{email:user_real.email}})

        const passwordEquals = await bcrypt.compare(dto.new_password, user.password);

        if(passwordEquals)  {
            throw new HttpException('New password cant equal the old one.',HttpStatus.BAD_REQUEST);
        }

        changed_password = await bcrypt.hash(dto.new_password, 5);
        return await this.password_update(user.id, changed_password);

    }
    async password_update(id:any, new_pass:any){
            return await this.userRepository.update({password:new_pass}, {where:{id}})
    }

}
