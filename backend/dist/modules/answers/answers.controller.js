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
const answers_service_1 = require("./answers.service");
const dto_1 = require("./dto");
const admin_guard_1 = require("../../guards/admin.guard");
let AnswersController = class AnswersController {
    constructor(answersService) {
        this.answersService = answersService;
    }
    getAnswer(id) {
        return this.answersService.getAnswer(id);
    }
    findAll() {
        return this.answersService.findAll();
    }
    searchAnswersByQuestion(id) {
        return this.answersService.searchAnswersByQuestion(id);
    }
    searchAnswersByUser(id) {
        return this.answersService.searchAnswersByUser(id);
    }
    createAnswer(answer) {
        return this.answersService.createAnswer(answer);
    }
    deleteAnswer(id) {
        return this.answersService.deleteAnswer(id);
    }
};
exports.AnswersController = AnswersController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "getAnswer", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findByQuestion/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "searchAnswersByQuestion", null);
__decorate([
    (0, common_1.Get)('findByUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "searchAnswersByUser", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AnswerCreateDto]),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "createAnswer", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "deleteAnswer", null);
exports.AnswersController = AnswersController = __decorate([
    (0, common_1.Controller)('answers'),
    __metadata("design:paramtypes", [answers_service_1.AnswersService])
], AnswersController);
//# sourceMappingURL=answers.controller.js.map