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
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const favorite_dto_1 = require("../dto/favorite.dto");
const favorites_service_1 = require("../services/favorites.service");
let FavoritesController = class FavoritesController {
    constructor(favService) {
        this.favService = favService;
    }
    async getFavorites() {
        try {
            return await this.favService.getFavorites();
        }
        catch (error) {
            console.log(error);
        }
    }
    async getFavoritesQuestion(id) {
        try {
            return await this.favService.getFavoritesQuestion(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getFavoritesUser(id) {
        try {
            return await this.favService.getFavoritesUser(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    async notifyFavorites(idUser) {
        try {
            return await this.favService.notifyFavorites(idUser);
        }
        catch (error) {
            console.log(error);
        }
    }
    async addFavorite(favDto) {
        try {
            return await this.favService.addFavorite(favDto);
        }
        catch (error) {
            console.log(error);
        }
    }
    async removeFavorite(favDto) {
        try {
            return await this.favService.removeFavorite(favDto);
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteNotified(favDto) {
        try {
            return await this.favService.deleteNotified(favDto);
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Get)('findByQuest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "getFavoritesQuestion", null);
__decorate([
    (0, common_1.Get)('findByUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "getFavoritesUser", null);
__decorate([
    (0, common_1.Get)('notify/:idUser'),
    __param(0, (0, common_1.Param)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "notifyFavorites", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorite_dto_1.FavoriteDto]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Post)('remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorite_dto_1.FavoriteDto]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "removeFavorite", null);
__decorate([
    (0, common_1.Post)('deleteNotified'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorite_dto_1.FavoriteDto]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "deleteNotified", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, common_1.Controller)('favorites'),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
//# sourceMappingURL=favorites.controller.js.map