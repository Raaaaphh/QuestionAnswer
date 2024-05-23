import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from 'argon2';
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { JwtService } from "@nestjs/jwt";
import { sendMail } from "src/mailers/mail.utils";
import { User } from "src/modules/users/user.model";
import { AuthLoginDto, AuthRegisterDto } from "../dto";


@Injectable({})
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User, private jwtService: JwtService) { }

    test() {
        return 'Hello World ! depuis le Back';
    }

    async login(authlog: AuthLoginDto) {
        const user = await this.userModel.findOne({
            where: { name: authlog.name }
        });

        if (!user) {
            throw new ForbiddenException('User not found');
        }
        const valid = await argon.verify(user.password, authlog.password);
        if (!valid) {
            throw new ForbiddenException('Invalid password');
        }

        const payload = { id: user.idUser, role: user.role };
        const token = this.jwtService.sign(payload);

        return { user, token };
    }

    async register(authreg: AuthRegisterDto) {
        const hash = await argon.hash(authreg.password);
        console.log(hash);

        const idUser = uuidv4();
        console.log(idUser);

        const colors = ['FFB5B5', 'FFC8F0', 'FFD6A6', 'FEFFB4', 'C7FFF8', 'B7BEFF', 'ACACAC', 'C6FFCC'];

        const color = colors[Math.floor(Math.random() * colors.length)];

        const crypto = require('crypto');
        const emailToken = crypto.randomBytes(64).toString("hex");

        const newUser = await this.userModel.create({
            idUser: idUser,
            name: authreg.name,
            email: authreg.email,
            password: hash,
            color: color,
            emailToken: emailToken,
        });
        console.log("New user" + newUser);

        sendMail(authreg.email, emailToken);
        return newUser;
    }

    async verifyEmail(emailToken: string): Promise<{ status: string, message: string }> {
        if (!emailToken) {
            throw new BadRequestException('Email token is missing');
        }

        const user = await this.userModel.findOne({ where: { emailToken } });
        if (!user) {
            throw new ForbiddenException('User not found');
        }

        user.confirmed = true;
        user.emailToken = null;
        await user.save();

        return { status: 'Success', message: 'User verified successfully' };
    }
}