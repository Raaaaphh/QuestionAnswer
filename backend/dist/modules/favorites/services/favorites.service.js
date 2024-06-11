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
const uuid_1 = require("uuid");
const favorite_model_1 = require("../favorite.model");
let FavoritesService = class FavoritesService {
    constructor(favModel) {
        this.favModel = favModel;
    }
    async getFavorites() {
        try {
            return await this.favModel.findAll();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getFavoritesQuestion(id) {
        try {
            if (!(0, uuid_1.validate)(id)) {
                throw new common_1.BadRequestException('Invalid question ID');
            }
            const favorites = await this.favModel.findAll({
                where: {
                    idQuest: id
                }
            });
            if (!favorites) {
                throw new common_1.NotFoundException('Question not found');
            }
            return favorites;
        }
        catch (error) {
            throw error;
        }
    }
    async getFavoritesUser(id) {
        try {
            if (!(0, uuid_1.validate)(id)) {
                throw new common_1.BadRequestException('Invalid user ID');
            }
            const favorites = await this.favModel.findAll({
                where: {
                    idUser: id
                }
            });
            if (!favorites) {
                throw new common_1.NotFoundException('User not found');
            }
            return favorites;
        }
        catch (error) {
            throw error;
        }
    }
    async notifyFavorites(id) {
        try {
            if (!(0, uuid_1.validate)(id)) {
                throw new common_1.BadRequestException('Invalid User ID');
            }
            const favorites = await this.favModel.findAll({
                where: {
                    idUser: id,
                    notified: true
                }
            });
            return favorites;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteNotified(dto) {
        try {
            const favorite = await this.favModel.findOne({
                where: {
                    idUser: dto.idUser,
                    idQuest: dto.idQuest
                }
            });
            if (!favorite) {
                throw new common_1.NotFoundException('Favorite not found');
            }
            favorite.notified = false;
            await favorite.save();
            return favorite;
        }
        catch (error) {
            throw error;
        }
    }
    async addFavorite(favDto) {
        try {
            const favorite = await this.favModel.create({
                idUser: favDto.idUser,
                idQuest: favDto.idQuest,
            });
            return favorite;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async removeFavorite(favDto) {
        try {
            const favorite = await this.favModel.findOne({
                where: {
                    idUser: favDto.idUser,
                    idQuest: favDto.idQuest
                }
            });
            if (!favorite) {
                throw new common_1.NotFoundException('Favorite not found');
            }
            await favorite.destroy();
            return favorite;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(favorite_model_1.Favorite)),
    __metadata("design:paramtypes", [Object])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map