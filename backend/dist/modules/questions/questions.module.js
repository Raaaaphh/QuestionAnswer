"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const questions_controller_1 = require("./controllers/questions.controller");
const sequelize_1 = require("@nestjs/sequelize");
const question_model_1 = require("./question.model");
const questiontags_module_1 = require("../questiontags/questiontags.module");
const pictures_module_1 = require("../pictures/pictures.module");
const questions_service_1 = require("./services/questions.service");
const votes_module_1 = require("../votes/votes.module");
const favorites_module_1 = require("../favorites/favorites.module");
let QuestionsModule = class QuestionsModule {
};
exports.QuestionsModule = QuestionsModule;
exports.QuestionsModule = QuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([question_model_1.Question]), questiontags_module_1.QuestiontagsModule, pictures_module_1.PicturesModule, votes_module_1.VotesModule, favorites_module_1.FavoritesModule],
        providers: [questions_service_1.QuestionsService],
        controllers: [questions_controller_1.QuestionsController],
        exports: [sequelize_1.SequelizeModule, questions_service_1.QuestionsService]
    })
], QuestionsModule);
//# sourceMappingURL=questions.module.js.map