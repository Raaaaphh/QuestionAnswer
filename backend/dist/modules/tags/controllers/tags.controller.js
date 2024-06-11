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
exports.TagsController = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../../../guards/admin.guard");
const tags_service_1 = require("../services/tags.service");
const tag_create_dto_1 = require("../dto/tag-create.dto");
let TagsController = class TagsController {
    constructor(tagsService) {
        this.tagsService = tagsService;
    }
    findAll() {
        try {
            return this.tagsService.findAll();
        }
        catch (error) {
            console.log(error);
        }
    }
    getTag(id) {
        try {
            return this.tagsService.getTag(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    createTag(tagDto) {
        try {
            return this.tagsService.createTag(tagDto);
        }
        catch (error) {
            console.log(error);
        }
    }
    deleteTag(id) {
        try {
            return this.tagsService.deleteTag(id);
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.TagsController = TagsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "getTag", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_create_dto_1.TagCreateDto]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "createTag", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "deleteTag", null);
exports.TagsController = TagsController = __decorate([
    (0, common_1.Controller)('tags'),
    __metadata("design:paramtypes", [tags_service_1.TagsService])
], TagsController);
//# sourceMappingURL=tags.controller.js.map