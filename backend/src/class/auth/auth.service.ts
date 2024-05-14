import { Injectable } from "@nestjs/common";
import { AuthLoginDto, AuthRegisterDto } from "./dto";
import * as argon from 'argon2';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/user.model";


@Injectable({})
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    test() {
        return 'Hello World ! depuis le Back';
    }

    async login(authlog: AuthLoginDto) {
        return 'Login';
    }

    async register(authreg: AuthRegisterDto) {
        const password = JSON.stringify(authreg.password);
        const hash = await argon.hash(password);
        console.log(hash);

        const newUser = await this.userModel.create({
            idUser: 'znajndzandakj',
            name: authreg.name,
            email: authreg.email,
            password: hash,
        });
        console.log("Le nouvel utilisateur" + newUser);
        return newUser;
    }
}