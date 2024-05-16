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
const sequelize_2 = require("sequelize");
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
    findAll() {
        return this.questModel.findAll();
    }
    async searchQuestions(search) {
        const questions = await this.questModel.findAll({
            where: {
                title: {
                    [sequelize_2.Op.like]: `%${search}%`
                }
            },
            limit: 20
        });
        if (!questions || questions.length === 0) {
            throw new common_1.ForbiddenException('Questions not found');
        }
        return questions;
    }
    async createQuestion(quest) {
        const idQuest = (0, uuid_1.v4)();
        console.log(idQuest);
        try {
            const question = await this.questModel.create({
                idQuest: idQuest,
                idUser: quest.idUser,
                title: quest.title,
                description: quest.description,
                context: quest.context,
            });
            console.log("New question" + question);
            return question;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Error during the creation of the question', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async editQuestion(question) {
        const quest = await this.questModel.findOne({
            where: {
                idQuest: question.idQuest
            }
        });
        if (!quest) {
            throw new common_1.ForbiddenException('Question not found');
        }
        if (!(0, uuid_1.validate)(quest.idUser)) {
            throw new common_1.BadRequestException('Invalid user ID');
        }
        quest.title = question.title;
        quest.description = question.description;
        quest.context = question.context;
        quest.idUser = question.idUser;
        await quest.save();
        return quest;
    }
    async deleteQuestion(id) {
        const question = await this.questModel.findOne({
            where: {
                idQuest: id
            }
        });
        if (!question) {
            throw new common_1.ForbiddenException('Question not found');
        }
        await question.destroy();
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(question_model_1.Question)),
    __metadata("design:paramtypes", [Object])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map