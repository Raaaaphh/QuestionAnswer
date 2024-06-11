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
exports.VotesController = void 0;
const common_1 = require("@nestjs/common");
const votes_service_1 = require("../services/votes.service");
let VotesController = class VotesController {
    constructor(votesService) {
        this.votesService = votesService;
    }
    async checkVote(idUser, idQuest) {
        try {
            return this.votesService.hasUserVoted(idUser, idQuest);
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.VotesController = VotesController;
__decorate([
    (0, common_1.Get)('check'),
    __param(0, (0, common_1.Query)('idUser')),
    __param(1, (0, common_1.Query)('idQuest')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], VotesController.prototype, "checkVote", null);
exports.VotesController = VotesController = __decorate([
    (0, common_1.Controller)('votes'),
    __metadata("design:paramtypes", [votes_service_1.VotesService])
], VotesController);
//# sourceMappingURL=votes.controller.js.map