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
let AnswersService = class AnswersService {
    constructor(answModel) {
        this.answModel = answModel;
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
            throw new common_1.ForbiddenException('Question not found');
        }
        return answer;
    }
    findAll() {
        return this.answModel.findAll();
    }
    async createAnswer(answDto) {
        const idAnsw = (0, uuid_1.v4)();
        console.log(idAnsw);
        try {
            const answer = await this.answModel.create({
                idAnsw: idAnsw,
                idUser: answDto.idUser,
                idQuest: answDto.idQuest,
                content: answDto.content,
            });
            console.log("La nouvelle reponse" + answer);
            return answer;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Erreur lors de la création de la question', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    deleteAnswer(id) {
        return `This action removes a #${id} answer`;
    }
};
exports.AnswersService = AnswersService;
exports.AnswersService = AnswersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(answer_model_1.Answer)),
    __metadata("design:paramtypes", [Object])
], AnswersService);
//# sourceMappingURL=answers.service.js.map