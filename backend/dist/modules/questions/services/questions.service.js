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
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const question_model_1 = require("../question.model");
const questiontag_model_1 = require("../../questiontags/questiontag.model");
const picture_model_1 = require("../../pictures/picture.model");
const vote_model_1 = require("../../votes/vote.model");
const favorite_model_1 = require("../../favorites/favorite.model");
const flag_model_1 = require("../../flags/flag.model");
let QuestionsService = class QuestionsService {
    constructor(questModel, questTagModel, pictureModel, voteModel, favoriteModel, flagModel, sequelize) {
        this.questModel = questModel;
        this.questTagModel = questTagModel;
        this.pictureModel = pictureModel;
        this.voteModel = voteModel;
        this.favoriteModel = favoriteModel;
        this.flagModel = flagModel;
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
    async findAllWithLimit(limit, page) {
        const intLimit = parseInt(limit, 10);
        const intPage = parseInt(page, 10);
        const offset = (intPage - 1) * intLimit;
        const questions = await this.questModel.findAll({
            limit: intLimit,
            offset: offset,
            order: [['createdAt', 'DESC']]
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
    async searchQuestionsByFilter(filter, limit) {
        const intLimit = parseInt(limit, 10);
        const questions = await this.questModel.findAll({
            where: {
                status: filter,
            },
            limit: intLimit,
            order: [['votes', 'DESC']]
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
    async searchQuestionsByTags(tags, limit) {
        const transaction = await this.sequelize.transaction();
        try {
            const tempQuestions = await this.questTagModel.findAll({
                where: {
                    idTag: {
                        [sequelize_2.Op.or]: tags
                    }
                },
                transaction
            });
            const idQuests = tempQuestions.map(question => question.idQuest);
            const questions = await this.questModel.findAll({
                where: {
                    idQuest: idQuests
                },
                limit: parseInt(limit, 10),
                transaction
            });
            if (!questions || questions.length === 0) {
                throw new common_1.ForbiddenException('Questions not found');
            }
            await transaction.commit();
            return questions;
        }
        catch (error) {
            await transaction.rollback();
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
    async setSolved(dto) {
        const { idUser, idQuest } = dto;
        const transaction = await this.sequelize.transaction();
        try {
            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });
            if (!quest) {
                throw new common_1.HttpException('Question not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (quest.idUser !== idUser) {
                throw new common_1.HttpException('User is not the author of the question', common_1.HttpStatus.FORBIDDEN);
            }
            quest.status = true;
            await quest.save({ transaction });
            const favorites = await this.favoriteModel.findAll({
                where: { idQuest },
                transaction,
            });
            for (const favorite of favorites) {
                favorite.notified = true;
                await favorite.save({ transaction });
            }
            await transaction.commit();
            return quest;
        }
        catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new common_1.HttpException(error.message || 'Error during the setting of the question as solved', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addVote(dto) {
        const idVote = (0, uuid_1.v4)();
        const { idUser, idQuest } = dto;
        const transaction = await this.sequelize.transaction();
        try {
            const existingVote = await this.voteModel.findOne({
                where: { idUser, idQuest },
                transaction,
            });
            if (existingVote) {
                throw new common_1.HttpException('User has already voted for this question', common_1.HttpStatus.BAD_REQUEST);
            }
            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });
            if (!quest) {
                throw new common_1.HttpException('Question not found', common_1.HttpStatus.NOT_FOUND);
            }
            quest.votes += 1;
            await quest.save({ transaction });
            await this.voteModel.create({
                idVote,
                idUser,
                idQuest,
            }, { transaction });
            await transaction.commit();
            return quest;
        }
        catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new common_1.HttpException(error.message || 'Error during the upload of votes', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeVote(dto) {
        const { idUser, idQuest } = dto;
        const transaction = await this.sequelize.transaction();
        try {
            const vote = await this.voteModel.findOne({
                where: { idUser, idQuest },
                transaction,
            });
            if (!vote) {
                throw new common_1.HttpException('Vote not found', common_1.HttpStatus.NOT_FOUND);
            }
            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });
            if (!quest) {
                throw new common_1.HttpException('Question not found', common_1.HttpStatus.NOT_FOUND);
            }
            quest.votes -= 1;
            await quest.save({ transaction });
            await this.voteModel.destroy({
                where: { idVote: vote.idVote },
                transaction,
            });
            await transaction.commit();
            return quest;
        }
        catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new common_1.HttpException(error.message || 'Error during the removal of vote', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addFlag(dto) {
        const idFlag = (0, uuid_1.v4)();
        const { idUser, idQuest, flagType } = dto;
        const transaction = await this.sequelize.transaction();
        try {
            const existingFlag = await this.flagModel.findOne({
                where: { idUser, idQuest, flagType },
                transaction,
            });
            if (existingFlag) {
                throw new common_1.HttpException('User has already flagged this question', common_1.HttpStatus.BAD_REQUEST);
            }
            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });
            if (!quest) {
                throw new common_1.HttpException('Question not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (flagType === 'Spam') {
                quest.flagsSpam += 1;
            }
            else {
                quest.flagsInappropriate += 1;
            }
            await quest.save({ transaction });
            await this.flagModel.create({
                idFlag: idFlag,
                idUser,
                idQuest,
                flagType: flagType,
            }, { transaction });
            await transaction.commit();
            return { status: 'Success', message: 'Flag added successfully' };
        }
        catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new common_1.HttpException(error.message || 'Error during the flagging of the question', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeFlag(dto) {
        const { idUser, idQuest, flagType } = dto;
        const transaction = await this.sequelize.transaction();
        try {
            const flag = await this.flagModel.findOne({
                where: { idUser, idQuest, flagType },
                transaction,
            });
            if (!flag) {
                throw new common_1.HttpException('Report not found', common_1.HttpStatus.NOT_FOUND);
            }
            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });
            if (!quest) {
                throw new common_1.HttpException('Question not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (flag.flagType === 'Spam') {
                quest.flagsSpam -= 1;
            }
            else {
                quest.flagsInappropriate -= 1;
            }
            await quest.save({ transaction });
            await this.flagModel.destroy({
                where: { idFlag: flag.idFlag },
                transaction,
            });
            await transaction.commit();
            return { status: 'Success', message: 'Flag removed successfully' };
        }
        catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new common_1.HttpException(error.message || 'Error during the removal of report', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async editQuestion(question) {
        const transaction = await this.sequelize.transaction();
        try {
            const quest = await this.questModel.findOne({
                where: {
                    idQuest: question.idQuest
                },
                transaction
            });
            if (!quest) {
                throw new common_1.ForbiddenException('Question not found');
            }
            quest.title = question.title;
            quest.description = question.description;
            quest.context = question.context;
            quest.idUser = question.idUser;
            await quest.save({ transaction });
            await this.questTagModel.destroy({
                where: {
                    idQuest: question.idQuest
                },
                transaction
            });
            const tagsData = question.listTags.map(tag => ({ idQuest: question.idQuest, idTag: tag }));
            await this.questTagModel.bulkCreate(tagsData, { transaction });
            await transaction.commit();
            return quest;
        }
        catch (error) {
            console.error(error);
            if (error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.HttpException(error.message || 'Error during the edition of the question', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    __param(3, (0, sequelize_1.InjectModel)(vote_model_1.Vote)),
    __param(4, (0, sequelize_1.InjectModel)(favorite_model_1.Favorite)),
    __param(5, (0, sequelize_1.InjectModel)(flag_model_1.Flag)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, sequelize_typescript_1.Sequelize])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map