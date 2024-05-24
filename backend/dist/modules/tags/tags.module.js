"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const tag_model_1 = require("./tag.model");
const tags_controller_1 = require("./controllers/tags.controller");
const tags_service_1 = require("./services/tags.service");
let TagsModule = class TagsModule {
};
exports.TagsModule = TagsModule;
exports.TagsModule = TagsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([tag_model_1.Tag])],
        controllers: [tags_controller_1.TagsController],
        providers: [tags_service_1.TagsService]
    })
], TagsModule);
//# sourceMappingURL=tags.module.js.map