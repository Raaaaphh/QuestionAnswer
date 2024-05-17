import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';
import { QuestiontagsModule } from '../questiontags/questiontags.module';

@Module({
    imports: [SequelizeModule.forFeature([Question]), QuestiontagsModule],
    providers: [QuestionsService],
    controllers: [QuestionsController],
})
export class QuestionsModule { }
