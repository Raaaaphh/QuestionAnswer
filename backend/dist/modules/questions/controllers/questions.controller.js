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
const dto_1 = require("../dto");
const student_guard_1 = require("../../../guards/student.guard");
const questions_service_1 = require("../services/questions.service");
let QuestionsController = class QuestionsController {
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    getQuestion(id) {
        try {
            return this.questionsService.getQuestion(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        try {
            return this.questionsService.findAll();
        }
        catch (error) {
            console.log(error);
        }
    }
    findAllWithLimit(limit) {
        try {
            if (limit === undefined) {
                limit = '20';
            }
            return this.questionsService.findAllWithLimit(limit);
        }
        catch (error) {
            console.log(error);
        }
    }
    searchQuestions(search, limit) {
        try {
            if (search === undefined) {
                throw new Error('Search is required');
            }
            if (limit === undefined) {
                limit = '20';
            }
            return this.questionsService.searchQuestions(search, limit);
        }
        catch (error) {
            console.log(error);
        }
    }
    searchQuestionsByFilter(filter, limit, order) {
        try {
            if (filter === undefined) {
                throw new Error('Filter is required');
            }
            if (limit === undefined) {
                limit = '20';
            }
            if (order === undefined) {
                order = 'asc';
            }
            return this.questionsService.searchQuestionsByFilter(filter, limit, order);
        }
        catch (error) {
            console.log(error);
        }
    }
    searchQuestionsByUser(id) {
        try {
            return this.questionsService.searchQuestionsByUser(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    async searchQuestionsByTags(tags) {
        try {
            if (!tags) {
                throw new common_1.BadRequestException('Tags query parameter is required');
            }
            const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
            if (tagsArray.length === 0) {
                throw new common_1.BadRequestException('At least one tag is required');
            }
            return await this.questionsService.searchQuestionsByTags(tagsArray);
        }
        catch (error) {
            console.log(error);
        }
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
        try {
            return this.questionsService.editQuestion(question);
        }
        catch (error) {
            console.log(error);
        }
    }
    deleteQuestion(id) {
        try {
            return this.questionsService.deleteQuestion(id);
        }
        catch (error) {
            console.log(error);
        }
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
    (0, common_1.Get)('all/limit?'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "findAllWithLimit", null);
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