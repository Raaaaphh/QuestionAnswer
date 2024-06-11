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
exports.PicturesController = void 0;
const common_1 = require("@nestjs/common");
const pictures_service_1 = require("../services/pictures.service");
let PicturesController = class PicturesController {
    constructor(picturesService) {
        this.picturesService = picturesService;
    }
    async getPicture(id) {
        try {
            const picture = await this.picturesService.getPicture(id);
            return picture;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPicturesByQuestion(id) {
        try {
            const pictures = await this.picturesService.getPicturesByQuestion(id);
            return pictures;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPicturesByAnswer(id) {
        try {
            const pictures = await this.picturesService.getPicturesByAnswer(id);
            return pictures;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deletePicture(id) {
        try {
            const picture = await this.picturesService.deletePicture(id);
            return picture;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PicturesController = PicturesController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PicturesController.prototype, "getPicture", null);
__decorate([
    (0, common_1.Get)('question/'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PicturesController.prototype, "getPicturesByQuestion", null);
__decorate([
    (0, common_1.Get)('answer/'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PicturesController.prototype, "getPicturesByAnswer", null);
__decorate([
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PicturesController.prototype, "deletePicture", null);
exports.PicturesController = PicturesController = __decorate([
    (0, common_1.Controller)('pictures'),
    __metadata("design:paramtypes", [pictures_service_1.PicturesService])
], PicturesController);
//# sourceMappingURL=pictures.controller.js.map