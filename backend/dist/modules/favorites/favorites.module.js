"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesModule = void 0;
const common_1 = require("@nestjs/common");
const favorites_controller_1 = require("./controllers/favorites.controller");
const sequelize_1 = require("@nestjs/sequelize");
const favorite_model_1 = require("./favorite.model");
const favorites_service_1 = require("./services/favorites.service");
let FavoritesModule = class FavoritesModule {
};
exports.FavoritesModule = FavoritesModule;
exports.FavoritesModule = FavoritesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([favorite_model_1.Favorite])],
        providers: [favorites_service_1.FavoritesService],
        controllers: [favorites_controller_1.FavoritesController],
        exports: [sequelize_1.SequelizeModule]
    })
], FavoritesModule);
//# sourceMappingURL=favorites.module.js.map