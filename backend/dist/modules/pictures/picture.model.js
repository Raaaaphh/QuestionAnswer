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
exports.Picture = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const question_model_1 = require("../questions/question.model");
const answer_model_1 = require("../answers/answer.model");
let Picture = class Picture extends sequelize_typescript_1.Model {
};
exports.Picture = Picture;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Picture.prototype, "idPicture", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => question_model_1.Question),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Picture.prototype, "idQuest", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => question_model_1.Question),
    __metadata("design:type", question_model_1.Question)
], Picture.prototype, "question", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => answer_model_1.Answer),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Picture.prototype, "idAnsw", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => answer_model_1.Answer),
    __metadata("design:type", answer_model_1.Answer)
], Picture.prototype, "answer", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Picture.prototype, "url", void 0);
exports.Picture = Picture = __decorate([
    sequelize_typescript_1.Table
], Picture);
//# sourceMappingURL=picture.model.js.map