"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../users/user.model");
const mailer_service_1 = require("../../mailers/mailer.service");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(userModel, mailerService) {
        this.userModel = userModel;
        this.mailerService = mailerService;
    }
    test() {
        return 'Hello World ! depuis le Back';
    }
    async login(authlog) {
        const user = await this.userModel.findOne({
            where: {
                name: authlog.name
            }
        });
        if (!user) {
            throw new common_1.ForbiddenException('User not found');
        }
        const valid = await argon.verify(user.password, authlog.password);
        if (!valid) {
            throw new common_1.ForbiddenException('Invalid password');
        }
        return user;
    }
    async register(authreg) {
        const hash = await argon.hash(authreg.password);
        console.log(hash);
        const idUser = (0, uuid_1.v4)();
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map