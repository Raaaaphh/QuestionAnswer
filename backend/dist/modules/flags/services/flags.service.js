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
exports.FlagsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const flag_model_1 = require("../flag.model");
let FlagsService = class FlagsService {
    constructor(flagModel) {
        this.flagModel = flagModel;
    }
    async hasUserFlagged(idUser, idQuest) {
        const vote = await this.flagModel.findOne({ where: { idUser, idQuest } });
        if (!vote) {
            throw new common_1.BadRequestException('User has not reported this question');
        }
        else {
            return true;
        }
    }
};
exports.FlagsService = FlagsService;
exports.FlagsService = FlagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(flag_model_1.Flag)),
    __metadata("design:paramtypes", [Object])
], FlagsService);
//# sourceMappingURL=flags.service.js.map