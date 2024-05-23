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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const favorite_model_1 = require("./favorite.model");
const uuid_1 = require("uuid");
let FavoritesService = class FavoritesService {
    constructor(favModel) {
        this.favModel = favModel;
    }
    async getFavorites() {
        return await this.favModel.findAll();
    }
    async getFavoritesType(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new common_1.BadRequestException('Invalid question ID');
        }
        const favorites = await this.favModel.findAll({
            where: {
                idQuest: id
            }
        });
        if (!favorites) {
            throw new common_1.ForbiddenException('Question or User not found');
        }
        return favorites;
    }
    async addFavorite(favDto) {
        const favorite = await this.favModel.create({
            idUser: favDto.idUser,
            idQuest: favDto.idQuest,
        });
        return favorite;
    }
    async removeFavorite(favDto) {
        const favorite = await this.favModel.findOne({
            where: {
                idUser: favDto.idUser,
                idQuest: favDto.idQuest
            }
        });
        if (!favorite) {
            throw new common_1.ForbiddenException('Favorite not found');
        }
        await favorite.destroy();
        return favorite;
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(favorite_model_1.Favorite)),
    __metadata("design:paramtypes", [Object])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map