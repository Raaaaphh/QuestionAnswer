"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestiontagsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const questiontag_model_1 = require("./questiontag.model");
const questiontags_service_1 = require("./questiontags.service");
const questiontags_controller_1 = require("./questiontags.controller");
let QuestiontagsModule = class QuestiontagsModule {
};
exports.QuestiontagsModule = QuestiontagsModule;
exports.QuestiontagsModule = QuestiontagsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([questiontag_model_1.QuestionTag])],
        providers: [questiontags_service_1.QuestionTagsService],
        controllers: [questiontags_controller_1.QuestionTagsController],
        exports: [sequelize_1.SequelizeModule],
    })
], QuestiontagsModule);
//# sourceMappingURL=questiontags.module.js.map