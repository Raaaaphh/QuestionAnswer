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
exports.AnswersController = void 0;
const common_1 = require("@nestjs/common");
const route_params_decorator_1 = require("@nestjs/common/decorators/http/route-params.decorator");
const dto_1 = require("../dto");
const answers_service_1 = require("../services/answers.service");
const answer_guard_1 = require("../../../guards/answer.guard");
let AnswersController = class AnswersController {
    constructor(answersService) {
        this.answersService = answersService;
    }
    async getAnswer(id) {
        try {
            const answer = await this.answersService.getAnswer(id);
            return answer;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            }
            else if (error instanceof common_1.ForbiddenException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.FORBIDDEN);
            }
            else {
                throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async findAll() {
        try {
            const answers = await this.answersService.findAll();
            return answers;
        }
        catch (error) {
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchAnswersByQuestion(id) {
        try {
            const answers = await this.answersService.searchAnswersByQuestion(id);
            return answers;
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.FORBIDDEN);
            }
            else {
                throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async searchAnswersByUser(id) {
        try {
            const answers = await this.answersService.searchAnswersByUser(id);
            return answers;
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.FORBIDDEN);
            }
            else {
                throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async createAnswer(answer) {
        try {
            const createdAnswer = await this.answersService.createAnswer(answer);
            return createdAnswer;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async deleteAnswer(id) {
        try {
            const deletedAnswer = await this.answersService.deleteAnswer(id);
            return deletedAnswer;
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.FORBIDDEN);
            }
            else {
                throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.AnswersController = AnswersController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "getAnswer", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findByQuestion/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "searchAnswersByQuestion", null);
__decorate([
    (0, common_1.Get)('findByUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "searchAnswersByUser", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(answer_guard_1.AnswerGuard),
    __param(0, (0, route_params_decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AnswerCreateDto]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "createAnswer", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "deleteAnswer", null);
exports.AnswersController = AnswersController = __decorate([
    (0, common_1.Controller)('answers'),
    __metadata("design:paramtypes", [answers_service_1.AnswersService])
], AnswersController);
//# sourceMappingURL=answers.controller.js.map