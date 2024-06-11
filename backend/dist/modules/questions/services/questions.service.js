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
const tag_model_1 = require("../../tags/tag.model");
let QuestionsService = class QuestionsService {
    constructor(questModel, questTagModel, pictureModel, voteModel, favoriteModel, flagModel, tagModel, sequelize) {
        this.questModel = questModel;
        this.questTagModel = questTagModel;
        this.pictureModel = pictureModel;
        this.voteModel = voteModel;
        this.favoriteModel = favoriteModel;
        this.flagModel = flagModel;
        this.tagModel = tagModel;
        this.sequelize = sequelize;
    }
    async getQuestion(id) {
        try {
            if (!(0, uuid_1.validate)(id)) {
                throw new common_1.BadRequestException('Invalid question ID');
            }
            const question = await this.questModel.findOne({
                where: {
                    idQuest: id
                }
            });
            if (!question) {
                throw new common_1.NotFoundException('Question not found');
            }
            return question;
        }
        catch (error) {
            throw error;
        }
    }
    findAll() {
        try {
            return this.questModel.findAll();
        }
        catch (error) {
            console.log(error);
        }
    }
    async findAllWithLimit(limit, page) {
        try {
            const intLimit = parseInt(limit, 10);
            const intPage = parseInt(page, 10);
            const offset = (intPage - 1) * intLimit;
            const questions = await this.questModel.findAll({
                limit: intLimit,
                offset: offset,
                order: [['createdAt', 'DESC']]
            });
            if (!questions || questions.length === 0) {
                throw new common_1.NotFoundException('Questions not found');
            }
            return questions;
        }
        catch (error) {
            throw error;
        }
    }
    async findReportedQuestions(limit, page) {
        try {
            const intLimit = parseInt(limit, 10);
            const intPage = parseInt(page, 10);
            const offset = (intPage - 1) * intLimit;
            const flagSum = sequelize_typescript_1.Sequelize.literal('`flagsSpam` + `flagsInappropriate`');
            const questions = await this.questModel.findAll({
                where: sequelize_typescript_1.Sequelize.where(flagSum, sequelize_2.Op.gte, 5),
                limit: intLimit,
                offset: offset,
                order: [
                    [flagSum, 'DESC']
                ]
            });
            if (!questions || questions.length === 0) {
                throw new common_1.NotFoundException('Questions not found');
            }
            return questions;
        }
        catch (error) {
            throw error;
        }
    }
    async searchQuestions(search, limit, page) {
        try {
            const intLimit = parseInt(limit, 10);
            const intPage = parseInt(page, 10);
            const offset = (intPage - 1) * intLimit;
            const questions = await this.questModel.findAll({
                where: {
                    title: {
                        [sequelize_2.Op.like]: `%${search}%`
                    }
                },
                limit: intLimit,
            });
            if (!questions || questions.length === 0) {
                throw new common_1.NotFoundException('Questions not found');
            }
            return questions;
        }
        catch (error) {
            throw error;
        }
    }
    async searchQuestionsByFilter(filter, limit, page) {
        try {
            const intLimit = parseInt(limit, 10);
            const intPage = parseInt(page, 10);
            const offset = (intPage - 1) * intLimit;
            const questions = await this.questModel.findAll({
                where: {
                    status: filter,
                },
                limit: intLimit,
                order: [['votes', 'DESC']]
            });
            if (!questions || questions.length === 0) {
                throw new common_1.NotFoundException('Questions not found');
            }
            return questions;
        }
        catch (error) {
            throw error;
        }
    }
    async searchQuestionsByUser(id, limit, page) {
        try {
            if (!(0, uuid_1.validate)(id)) {
                throw new common_1.BadRequestException('Invalid user ID');
            }
            const intLimit = parseInt(limit, 10);
            const intPage = parseInt(page, 10);
            const offset = (intPage - 1) * intLimit;
            const questions = await this.questModel.findAll({
                where: {
                    idUser: id
                },
                limit: intLimit,
            });
            if (!questions || questions.length === 0) {
                throw new common_1.NotFoundException('Questions not found');
            }
            return questions;
        }
        catch (error) {
            throw error;
        }
    }
    async searchQuestionsByTags(tags, limit, page) {
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
            if (!tempQuestions || tempQuestions.length === 0) {
                throw new common_1.NotFoundException('Questions not found');
            }
            const intLimit = parseInt(limit, 10);
            const intPage = parseInt(page, 10);
            const offset = (intPage - 1) * intLimit;
            const idQuests = tempQuestions.map(question => question.idQuest);
            const questions = await this.questModel.findAll({
                where: {
                    idQuest: idQuests
                },
                limit: intLimit,
                transaction
            });
            if (!questions || questions.length === 0) {
                throw new common_1.NotFoundException('Questions not found');
            }
            await transaction.commit();
            return questions;
        }
        catch (error) {
            await transaction.rollback();
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException('Error while searching questions by tags', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTagsForQuestion(id) {
        const transaction = await this.sequelize.transaction();
        try {
            if (!(0, uuid_1.validate)(id)) {
                throw new common_1.BadRequestException('Invalid question ID');
            }
            const tempTags = await this.questTagModel.findAll({
                where: {
                    idQuest: id
                },
                transaction
            });
            if (!tempTags || tempTags.length === 0) {
                throw new common_1.BadRequestException('Question has no tags');
            }
            const idTags = tempTags.map(tag => tag.idTag);
            const tags = await this.tagModel.findAll({
                where: {
                    idTag: idTags
                },
                transaction
            });
            if (!tags || tags.length === 0) {
                throw new common_1.NotFoundException('Tags not found');
            }
            await transaction.commit();
            return tags;
        }
        catch (error) {
            throw error;
        }
    }
    async createQuestion(quest) {
        const idQuest = (0, uuid_1.v4)();
        const transaction = await this.sequelize.transaction();
        try {
            if (quest.title.length > 100) {
                throw new common_1.BadRequestException('The title is too long');
            }
            const newTitleWords = quest.title.toLowerCase().split(' ').filter(word => word.length > 0);
            const existingQuestions = await this.questModel.findAll();
            for (const existingQuestion of existingQuestions) {
                const existingTitleWords = existingQuestion.title.toLowerCase().split(' ').filter(word => word.length > 0);
                const similarWordsCount = this.findSimilarWordsCount(newTitleWords, existingTitleWords);
                if (similarWordsCount >= 80) {
                    throw new common_1.ConflictException('A question with a similar title already exists');
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
            if (error instanceof common_1.BadRequestException || error instanceof common_1.ConflictException) {
                throw error;
            }
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
                throw new common_1.NotFoundException('Question not found');
            }
            if (quest.idUser !== idUser) {
                throw new common_1.ForbiddenException('User is not the author of the question');
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
            if (error instanceof common_1.ForbiddenException || error instanceof common_1.NotFoundException) {
                throw error;
            }
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
                throw new common_1.BadRequestException('User has already voted for this question');
            }
            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });
            if (!quest) {
                throw new common_1.NotFoundException('Question not found');
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
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
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
                throw new common_1.NotFoundException('Vote not found');
            }
            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });
            if (!quest) {
                throw new common_1.NotFoundException('Question not found');
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
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
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
                throw new common_1.BadRequestException('User has already flagged this question');
            }
            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });
            if (!quest) {
                throw new common_1.NotFoundException('Question not found');
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
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
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
                throw new common_1.NotFoundException('Report not found');
            }
            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });
            if (!quest) {
                throw new common_1.NotFoundException('Question not found');
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
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
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
                throw new common_1.NotFoundException('Question not found');
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
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException(error.message || 'Error during the edition of the question', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteQuestion(id) {
        try {
            if (!(0, uuid_1.validate)(id)) {
                throw new common_1.BadRequestException('Invalid question ID');
            }
            const question = await this.questModel.findOne({
                where: {
                    idQuest: id
                }
            });
            if (!question) {
                throw new common_1.NotFoundException('Question not found');
            }
            await question.destroy();
            return question;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.HttpException(error.message || 'Error during the deletion of the question', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    __param(6, (0, sequelize_1.InjectModel)(tag_model_1.Tag)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, sequelize_typescript_1.Sequelize])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map