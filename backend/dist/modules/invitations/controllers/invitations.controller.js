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
exports.InvitationsController = void 0;
const common_1 = require("@nestjs/common");
const invitations_service_1 = require("../services/invitations.service");
let InvitationsController = class InvitationsController {
    constructor(invitService) {
        this.invitService = invitService;
    }
    async sendInvitation(email, role) {
        try {
            return await this.invitService.sendInvitation(email, role);
        }
        catch (error) {
            console.log(error);
        }
    }
    async validateInvitation(token) {
        try {
            return await this.invitService.validateInvitation(token);
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.InvitationsController = InvitationsController;
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InvitationsController.prototype, "sendInvitation", null);
__decorate([
    (0, common_1.Get)('validate'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvitationsController.prototype, "validateInvitation", null);
exports.InvitationsController = InvitationsController = __decorate([
    (0, common_1.Controller)('invitations'),
    __metadata("design:paramtypes", [invitations_service_1.InvitationsService])
], InvitationsController);
//# sourceMappingURL=invitations.controller.js.map