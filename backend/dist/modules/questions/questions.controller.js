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
    searchQuestions(search) {
        return this.questionsService.searchQuestions(search);
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
    (0, common_1.Get)('search/:search'),
    __param(0, (0, common_1.Param)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "searchQuestions", null);
__decorate([
    (0, common_1.Post)('create'),
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