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
const mailer_service_1 = require("../../Mailers/mailer.service");
let AuthService = class AuthService {
    constructor(userModel, mailerService) {
        this.userModel = userModel;
        this.mailerService = mailerService;
    }
    test() {
        return 'Hello World ! depuis le Back';
    }
    async login(authlog) {
        return 'Login';
    }
    async register(authreg) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map