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
exports.PicturesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const picture_model_1 = require("./picture.model");
const uuid_1 = require("uuid");
let PicturesService = class PicturesService {
    constructor(pictModel) {
        this.pictModel = pictModel;
    }
    async getPicture(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new common_1.BadRequestException('Invalid picture ID');
        }
        const picture = await this.pictModel.findOne({
            where: {
                idPict: id
            }
        });
        if (!picture) {
            throw new common_1.ForbiddenException('Picture not found');
        }
        return picture;
    }
    async getPicturesByQuestion(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new common_1.BadRequestException('Invalid question ID');
        }
        const pictures = await this.pictModel.findAll({
            where: {
                idQuest: id
            }
        });
        if (!pictures || pictures.length === 0) {
            throw new common_1.ForbiddenException('Pictures not found');
        }
        return pictures;
    }
    async getPicturesByAnswer(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new common_1.BadRequestException('Invalid answer ID');
        }
        const pictures = await this.pictModel.findAll({
            where: {
                idAnsw: id
            }
        });
        if (!pictures || pictures.length === 0) {
            throw new common_1.ForbiddenException('Pictures not found');
        }
        return pictures;
    }
    async deletePicture(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new common_1.BadRequestException('Invalid picture ID');
        }
        const picture = await this.pictModel.findOne({
            where: {
                idPict: id
            }
        });
        if (!picture) {
            throw new common_1.ForbiddenException('Picture not found');
        }
        await picture.destroy();
        return picture;
    }
};
exports.PicturesService = PicturesService;
exports.PicturesService = PicturesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(picture_model_1.Picture)),
    __metadata("design:paramtypes", [Object])
], PicturesService);
//# sourceMappingURL=pictures.service.js.map