import { Module } from '@nestjs/common';
import { AnswersController } from './controllers/answers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { PicturesModule } from '../pictures/pictures.module';
import { AnswersService } from './services/answers.service';
import { QuestionsModule } from '../questions/questions.module';

@Module({
    imports: [SequelizeModule.forFeature([Answer]), PicturesModule, QuestionsModule],
    providers: [AnswersService],
    controllers: [AnswersController],
})
export class AnswersModule { }
