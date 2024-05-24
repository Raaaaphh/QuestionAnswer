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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorite = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../users/user.model");
const question_model_1 = require("../questions/question.model");
let Favorite = class Favorite extends sequelize_typescript_1.Model {
};
exports.Favorite = Favorite;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Favorite.prototype, "idUser", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Favorite.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => question_model_1.Question),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Favorite.prototype, "idQuest", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => question_model_1.Question),
    __metadata("design:type", question_model_1.Question)
], Favorite.prototype, "question", void 0);
exports.Favorite = Favorite = __decorate([
    sequelize_typescript_1.Table
], Favorite);
//# sourceMappingURL=favorite.model.js.map