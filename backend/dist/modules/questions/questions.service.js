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
const questiontag_model_1 = require("../questiontags/questiontag.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const picture_model_1 = require("../pictures/picture.model");
let QuestionsService = class QuestionsService {
    constructor(questModel, questTagModel, pictureModel, sequelize) {
        this.questModel = questModel;
        this.questTagModel = questTagModel;
        this.pictureModel = pictureModel;
        this.sequelize = sequelize;
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
    async findAllWithLimit(limit) {
        const intLimit = parseInt(limit, 10);
        const questions = await this.questModel.findAll({
            limit: intLimit
        });
        if (!questions || questions.length === 0) {
            throw new common_1.ForbiddenException('Questions not found');
        }
        return questions;
    }
    async searchQuestions(search, limit) {
        const intLimit = parseInt(limit, 10);
        const questions = await this.questModel.findAll({
            where: {
                title: {
                    [sequelize_2.Op.like]: `%${search}%`
                }
            },
            limit: intLimit,
        });
        if (!questions || questions.length === 0) {
            throw new common_1.ForbiddenException('Questions not found');
        }
        return questions;
    }
    async searchQuestionsByFilter(filter, limit, order) {
        const intLimit = parseInt(limit, 10);
        const questions = await this.questModel.findAll({
            limit: intLimit,
            order: [[filter, order]]
        });
        if (!questions || questions.length === 0) {
            throw new common_1.ForbiddenException('Questions not found');
        }
        return questions;
    }
    async searchQuestionsByUser(id) {
        const questions = await this.questModel.findAll({
            where: {
                idUser: id
            }
        });
        if (!questions || questions.length === 0) {
            throw new common_1.ForbiddenException('Questions not found');
        }
        return questions;
    }
    async searchQuestionsByTags(tags) {
        try {
            const questions = await this.questModel.findAll({
                include: [
                    {
                        model: questiontag_model_1.QuestionTag,
                        where: {
                            idTag: {
                                [sequelize_2.Op.in]: tags,
                            },
                        },
                    },
                ],
                group: ['Question.idQuest'],
                having: this.sequelize.literal(`COUNT(DISTINCT \`QuestionTags\`.\`idTag\`) = ${tags.length}`)
            });
            if (questions.length === 0) {
                throw new common_1.HttpException('No questions found for the given tags', common_1.HttpStatus.NOT_FOUND);
            }
            return questions;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Error while searching questions by tags', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createQuestion(quest) {
        const idQuest = (0, uuid_1.v4)();
        const transaction = await this.sequelize.transaction();
        try {
            if (quest.title.length > 100) {
                throw new common_1.HttpException('The title is too long', common_1.HttpStatus.BAD_REQUEST);
            }
            const newTitleWords = quest.title.toLowerCase().split(' ').filter(word => word.length > 0);
            const existingQuestions = await this.questModel.findAll();
            for (const existingQuestion of existingQuestions) {
                const existingTitleWords = existingQuestion.title.toLowerCase().split(' ').filter(word => word.length > 0);
                const similarWordsCount = this.findSimilarWordsCount(newTitleWords, existingTitleWords);
                if (similarWordsCount >= 80) {
                    throw new common_1.HttpException('A question with a similar title already exists', common_1.HttpStatus.CONFLICT);
                }
            }
            const question = await this.questModel.create({
                idQuest: idQuest,
                idUser: quest.idUser,
                title: quest.title,
                description: quest.description,
                context: quest.context,
            }, { transaction });
            const tagsData = quest.listTags.map(tag => ({ idQuest: idQuest, idTag: tag }));
            await this.questTagModel.bulkCreate(tagsData, { transaction });
            if (quest.listPictures) {
                const picturesData = quest.listPictures.map(picture => ({ idQuest: idQuest, url: picture, idAnsw: null, idPicture: (0, uuid_1.v4)() }));
                await this.pictureModel.bulkCreate(picturesData, { transaction });
            }
            await transaction.commit();
            return question;
        }
        catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new common_1.HttpException(error.message || 'Error during the creation of the question', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
        return question;
    }
    findSimilarWordsCount(title1, title2) {
        const set1 = new Set(title1);
        const set2 = new Set(title2);
        let similarCount = 0;
        set1.forEach(word => {
            if (set2.has(word)) {
                similarCount++;
            }
        });
        const totalWords = Math.max(title1.length, title2.length);
        return (similarCount / totalWords) * 100;
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(question_model_1.Question)),
    __param(1, (0, sequelize_1.InjectModel)(questiontag_model_1.QuestionTag)),
    __param(2, (0, sequelize_1.InjectModel)(picture_model_1.Picture)),
    __metadata("design:paramtypes", [Object, Object, Object, sequelize_typescript_1.Sequelize])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map