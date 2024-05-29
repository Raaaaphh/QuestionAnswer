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
exports.AnswersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const answer_model_1 = require("./answer.model");
const sequelize_1 = require("@nestjs/sequelize");
const picture_model_1 = require("../pictures/picture.model");
const sequelize_typescript_1 = require("sequelize-typescript");
let AnswersService = class AnswersService {
    constructor(answModel, pictureModel, sequelize) {
        this.answModel = answModel;
        this.pictureModel = pictureModel;
        this.sequelize = sequelize;
    }
    async getAnswer(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new common_1.BadRequestException('Invalid answer ID');
        }
        const answer = await this.answModel.findOne({
            where: {
                idAnsw: id
            }
        });
        if (!answer) {
            throw new common_1.ForbiddenException('Answer not found');
        }
        return answer;
    }
    findAll() {
        return this.answModel.findAll();
    }
    async searchAnswersByUser(id) {
        const answers = await this.answModel.findAll({
            where: {
                idUser: id
            }
        });
        if (!answers || answers.length === 0) {
            throw new common_1.ForbiddenException('Answers not found');
        }
        return answers;
    }
    async searchAnswersByQuestion(id) {
        const answers = await this.answModel.findAll({
            where: {
                idQuest: id
            }
        });
        if (!answers || answers.length === 0) {
            throw new common_1.ForbiddenException('Answers not found');
        }
        return answers;
    }
    async createAnswer(answDto) {
        const idAnsw = (0, uuid_1.v4)();
        console.log(idAnsw);
        const transaction = await this.sequelize.transaction();
        try {
            const answer = await this.answModel.create({
                idAnsw: idAnsw,
                idUser: answDto.idUser,
                idQuest: answDto.idQuest,
                content: answDto.content,
            }, { transaction });
            if (answDto.listPictures) {
                const picturesData = answDto.listPictures.map(picture => ({ idQuest: null, url: picture, idAnsw: idAnsw, idPicture: (0, uuid_1.v4)() }));
                await this.pictureModel.bulkCreate(picturesData, { transaction });
            }
            await transaction.commit();
            return answer;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Error during the creation of the answer', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteAnswer(id) {
        const answer = await this.answModel.findOne({
            where: {
                idAnsw: id
            }
        });
        if (!answer) {
            throw new common_1.ForbiddenException('Answer not found');
        }
        await answer.destroy();
        return answer;
    }
};
exports.AnswersService = AnswersService;
exports.AnswersService = AnswersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(answer_model_1.Answer)),
    __param(1, (0, sequelize_1.InjectModel)(picture_model_1.Picture)),
    __metadata("design:paramtypes", [Object, Object, sequelize_typescript_1.Sequelize])
], AnswersService);
//# sourceMappingURL=answers.service.js.map