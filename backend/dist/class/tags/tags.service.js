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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const tag_model_1 = require("./tag.model");
const uuid_1 = require("uuid");
const common_2 = require("@nestjs/common");
let TagsService = class TagsService {
    constructor(tagModel) {
        this.tagModel = tagModel;
    }
    findAll() {
        return this.tagModel.findAll();
    }
    async getTag(id) {
        return "Tag not found";
    }
    async createTag(tagDto) {
        const idTag = (0, uuid_1.v4)();
        console.log(idTag);
        try {
            const tag = await this.tagModel.create({
                idTag: idTag,
                name: tagDto.name,
                description: tagDto.description,
                idUser: tagDto.idUser,
            });
            console.log("Le nouveau tag" + tag);
            return tag;
        }
        catch (error) {
            console.log(error);
            throw new common_2.HttpException('Erreur lors de la création du tag', common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteTag(id) {
        return "Tag deleted";
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(tag_model_1.Tag)),
    __metadata("design:paramtypes", [Object])
], TagsService);
//# sourceMappingURL=tags.service.js.map