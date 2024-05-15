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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const sequelize_1 = require("@nestjs/sequelize");
const question_model_1 = require("./question.model");
let QuestionsService = class QuestionsService {
    constructor(questModel) {
        this.questModel = questModel;
    }
    async getQuestion(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new common_1.BadRequestException('Invalid question ID');
        }
        const question = await this.questModel.findOne({
            where: {
                idQuest: id
            }
        });
        if (!question) {
            throw new common_1.ForbiddenException('Question not found');
        }
        return question;
    }
    async createQuestion(quest) {
        const { v4: uuidv4 } = require("uuid");
        const idQuest = uuidv4();
        console.log(idQuest);
        try {
            const question = await this.questModel.create({
                idQuest: idQuest,
                idUser: quest.idUser,
                content: quest.content,
            });
            console.log("La nouvelle question" + question);
            return question;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Erreur lors de la création de la question', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    editQuestion(question) {
        return 'Question edited !';
    }
    deleteQuestion(id) {
        return 'Question deleted !';
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(question_model_1.Question)),
    __metadata("design:paramtypes", [Object])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map