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
exports.Question = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const answer_model_1 = require("../answers/answer.model");
const favorite_model_1 = require("../favorites/favorite.model");
const user_model_1 = require("../users/user.model");
let Question = class Question extends sequelize_typescript_1.Model {
};
exports.Question = Question;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Question.prototype, "idQuest", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Question.prototype, "idUser", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Question.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Question.prototype, "votes", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Question.prototype, "flagsSpam", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Question.prototype, "flagsInappropiate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Question.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => answer_model_1.Answer),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => favorite_model_1.Favorite),
    __metadata("design:type", Array)
], Question.prototype, "favorites", void 0);
exports.Question = Question = __decorate([
    sequelize_typescript_1.Table
], Question);
//# sourceMappingURL=question.model.js.map