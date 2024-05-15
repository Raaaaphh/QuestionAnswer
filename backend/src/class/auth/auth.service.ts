import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthLoginDto, AuthRegisterDto } from "./dto";
import * as argon from 'argon2';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/user.model";
import { MailerService } from "src/mailers/mailer.service";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';


@Injectable({})
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User, private mailerService: MailerService) { }

    test() {
        return 'Hello World ! depuis le Back';
    }

    async login(authlog: AuthLoginDto) {
        const user = await this.userModel.findOne({
            where:
            {
                name: authlog.name
            }
        });

        if (!user) {
            throw new ForbiddenException('User not found');
        }
        const valid = await argon.verify(user.password, authlog.password);
        if (!valid) {
            throw new ForbiddenException('Invalid password');
        }

        return user;
    }

    async register(authreg: AuthRegisterDto) {
        const hash = await argon.hash(authreg.password);
        console.log(hash);

        const idUser = uuidv4();
        console.log(idUser);

        const colors = ['FFB5B5', 'FFC8F0', 'FFD6A6', 'FEFFB4', 'C7FFF8', 'B7BEFF', 'ACACAC', 'C6FFCC'];

        const color = colors[Math.floor(Math.random() * colors.length)];

        const newUser = await this.userModel.create({
            idUser: idUser,
            name: authreg.name,
            email: authreg.email,
            password: hash,
            color: color
        });
        console.log("Le nouvel utilisateur" + newUser);

        return newUser;
    }
}