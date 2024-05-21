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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const questions_service_1 = require("./questions.service");
const dto_1 = require("./dto");
const student_guard_1 = require("../../guards/student.guard");
let QuestionsController = class QuestionsController {
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    getQuestion(id) {
        return this.questionsService.getQuestion(id);
    }
    findAll() {
        return this.questionsService.findAll();
    }
    searchQuestions(search, limit) {
        if (limit === undefined) {
            limit = '20';
        }
        return this.questionsService.searchQuestions(search, limit);
    }
    searchQuestionsByFilter(filter, limit, order) {
        if (limit === undefined) {
            limit = '20';
        }
        if (order === undefined) {
            order = 'asc';
        }
        if (filter === undefined) {
            throw new Error('Filter is required');
        }
        return this.questionsService.searchQuestionsByFilter(filter, limit, order);
    }
    searchQuestionsByUser(id) {
        return this.questionsService.searchQuestionsByUser(id);
    }
    async searchQuestionsByTags(tags) {
        if (!tags) {
            throw new common_1.BadRequestException('Tags query parameter is required');
        }
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        if (tagsArray.length === 0) {
            throw new common_1.BadRequestException('At least one tag is required');
        }
        return await this.questionsService.searchQuestionsByTags(tagsArray);
    }
    createQuestion(quest) {
        try {
            return this.questionsService.createQuestion(quest);
        }
        catch (error) {
            console.log(error);
        }
    }
    editQuestion(question) {
        return this.questionsService.editQuestion(question);
    }
    deleteQuestion(id) {
        return this.questionsService.deleteQuestion(id);
    }
};
exports.QuestionsController = QuestionsController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "getQuestion", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findByName/name?'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "searchQuestions", null);
__decorate([
    (0, common_1.Get)('findByFilter/filter?'),
    __param(0, (0, common_1.Query)('filter')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "searchQuestionsByFilter", null);
__decorate([
    (0, common_1.Get)('findByUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "searchQuestionsByUser", null);
__decorate([
    (0, common_1.Get)('findByTags/tags?'),
    __param(0, (0, common_1.Query)('tags')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "searchQuestionsByTags", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(student_guard_1.StudentGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QuestionCreateDto]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Post)('edit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QuestionEditDto]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "editQuestion", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "deleteQuestion", null);
exports.QuestionsController = QuestionsController = __decorate([
    (0, common_1.Controller)('questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
//# sourceMappingURL=questions.controller.js.map