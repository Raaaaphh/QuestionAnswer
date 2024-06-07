"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const flag_model_1 = require("./flag.model");
const flags_service_1 = require("./services/flags.service");
const flags_controller_1 = require("./controllers/flags.controller");
let FlagsModule = class FlagsModule {
};
exports.FlagsModule = FlagsModule;
exports.FlagsModule = FlagsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([flag_model_1.Flag])],
        controllers: [flags_controller_1.FlagsController],
        providers: [flags_service_1.FlagsService],
        exports: [sequelize_1.SequelizeModule],
    })
], FlagsModule);
//# sourceMappingURL=flags.module.js.map