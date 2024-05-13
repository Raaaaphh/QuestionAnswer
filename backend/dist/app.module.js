"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const app_service_1 = require("./app.service");
const user_model_1 = require("./users/user.model");
const users_module_1 = require("./users/users.module");
const questions_module_1 = require("./questions/questions.module");
const answers_module_1 = require("./answers/answers.module");
const favorites_module_1 = require("./favorites/favorites.module");
const question_model_1 = require("./questions/question.model");
const answer_model_1 = require("./answers/answer.model");
const favorite_model_1 = require("./favorites/favorite.model");
const questiontags_module_1 = require("./questiontags/questiontags.module");
const invitations_module_1 = require("./invitations/invitations.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            auth_module_1.AuthModule,
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    dialect: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    models: [user_model_1.User, question_model_1.Question, answer_model_1.Answer, favorite_model_1.Favorite],
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            questions_module_1.QuestionsModule,
            answers_module_1.AnswersModule,
            favorites_module_1.FavoritesModule,
            questiontags_module_1.QuestiontagsModule,
            invitations_module_1.InvitationsModule,],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map