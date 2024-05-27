import { Module } from '@nestjs/common';
import { QuestionsController } from './controllers/questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';
import { QuestiontagsModule } from '../questiontags/questiontags.module';
import { PicturesModule } from '../pictures/pictures.module';
import { QuestionsService } from './services/questions.service';
import { VotesModule } from '../votes/votes.module';

@Module({
    imports: [SequelizeModule.forFeature([Question]), QuestiontagsModule, PicturesModule, VotesModule],
    providers: [QuestionsService],
    controllers: [QuestionsController],
})
export class QuestionsModule { }
