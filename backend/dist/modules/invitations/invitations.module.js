"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const invitation_model_1 = require("./invitation.model");
const invitations_controller_1 = require("./controllers/invitations.controller");
const invitations_service_1 = require("./services/invitations.service");
const jwt_1 = require("@nestjs/jwt");
let InvitationsModule = class InvitationsModule {
};
exports.InvitationsModule = InvitationsModule;
exports.InvitationsModule = InvitationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([invitation_model_1.Invitation]),
            jwt_1.JwtModule.register({
                secret: 'questionanswer',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        providers: [invitations_service_1.InvitationsService],
        controllers: [invitations_controller_1.InvitationsController],
        exports: [invitations_service_1.InvitationsService],
    })
], InvitationsModule);
//# sourceMappingURL=invitations.module.js.map