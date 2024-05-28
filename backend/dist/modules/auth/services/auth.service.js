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
const uuid_1 = require("uuid");
const jwt_1 = require("@nestjs/jwt");
const mail_utils_1 = require("../../../mailers/mail.utils");
const user_model_1 = require("../../users/user.model");
const invitations_service_1 = require("../../invitations/services/invitations.service");
let AuthService = class AuthService {
    constructor(userModel, invitationService, jwtService) {
        this.userModel = userModel;
        this.invitationService = invitationService;
        this.jwtService = jwtService;
    }
    test() {
        return 'Hello World ! depuis le Back';
    }
    async login(authlog) {
        try {
            const user = await this.userModel.findOne({ where: { name: authlog.name } });
            if (!user) {
                throw new common_1.ForbiddenException('User not found');
            }
            const valid = await argon.verify(user.password, authlog.password);
            if (!valid) {
                throw new common_1.ForbiddenException('Invalid password');
            }
            if (user.banned) {
                throw new common_1.ForbiddenException('User is banned');
            }
            const payload = { id: user.idUser, role: user.role };
            const token = this.jwtService.sign(payload);
            return { user, token };
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw error;
            }
            console.log(error);
            throw new common_1.InternalServerErrorException('An unexpected error occurred during login');
        }
    }
    async register(authreg) {
        try {
            const hash = await argon.hash(authreg.password);
            const idUser = (0, uuid_1.v4)();
            const colors = ['FFB5B5', 'FFC8F0', 'FFD6A6', 'FEFFB4', 'C7FFF8', 'B7BEFF', 'ACACAC', 'C6FFCC'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const crypto = require('crypto');
            const emailToken = crypto.randomBytes(64).toString("hex");
            const newUser = await this.userModel.create({
                idUser,
                name: authreg.name,
                email: authreg.email,
                password: hash,
                color,
                emailToken,
            });
            (0, mail_utils_1.sendMail)(authreg.email, emailToken);
            return newUser;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('An unexpected error occurred during registration');
        }
    }
    async verifyEmail(emailToken) {
        try {
            if (!emailToken) {
                throw new common_1.BadRequestException('Email token is missing');
            }
            const user = await this.userModel.findOne({ where: { emailToken } });
            if (!user) {
                throw new common_1.ForbiddenException('User not found');
            }
            user.confirmed = true;
            user.emailToken = null;
            await user.save();
            return { status: 'Success', message: 'User verified successfully' };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred during email verification');
        }
    }
    async registerWithToken(token, invitationReg) {
        try {
            const hash = await argon.hash(invitationReg.password);
            const idUser = (0, uuid_1.v4)();
            const colors = ['FFB5B5', 'FFC8F0', 'FFD6A6', 'FEFFB4', 'C7FFF8', 'B7BEFF', 'ACACAC', 'C6FFCC'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const invitation = await this.invitationService.validateInvitation(token);
            const role = invitation.role;
            if (invitationReg.email !== invitation.email) {
                throw new common_1.ForbiddenException('Email does not match invitation');
            }
            const newUser = await this.userModel.create({
                idUser,
                name: invitationReg.name,
                email: invitationReg.email,
                password: hash,
                confirmed: true,
                color,
                role,
            });
            return newUser;
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred during registration with token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, invitations_service_1.InvitationsService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map