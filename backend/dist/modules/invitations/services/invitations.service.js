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
exports.InvitationsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const invitation_model_1 = require("../invitation.model");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
const mail_utils_1 = require("../../../mailers/mail.utils");
let InvitationsService = class InvitationsService {
    constructor(questModel, jwtService) {
        this.questModel = questModel;
        this.jwtService = jwtService;
    }
    async sendInvitation(email, role) {
        const invitation = new invitation_model_1.Invitation();
        invitation.idInvitation = (0, uuid_1.v4)();
        invitation.email = email;
        invitation.role = role;
        await invitation.save();
        const payload = { email, role };
        const token = this.jwtService.sign(payload, { expiresIn: '7d' });
        const inviteLink = `http://localhost:5173/register/invitation?token=${token}`;
        await (0, mail_utils_1.sendMailInvitation)(email, inviteLink);
        return invitation;
    }
    async validateInvitation(token) {
        try {
            const decoded = this.jwtService.verify(token);
            return { email: decoded.email, role: decoded.role };
        }
        catch (error) {
            throw new common_1.NotFoundException('Invalid or expired token');
        }
    }
};
exports.InvitationsService = InvitationsService;
exports.InvitationsService = InvitationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(invitation_model_1.Invitation)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], InvitationsService);
//# sourceMappingURL=invitations.service.js.map