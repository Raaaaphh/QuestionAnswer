import { Module } from '@nestjs/common';
import { QuestionsController } from './controllers/questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';
import { QuestiontagsModule } from '../questiontags/questiontags.module';
import { PicturesModule } from '../pictures/pictures.module';
import { QuestionsService } from './services/questions.service';
import { VotesModule } from '../votes/votes.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
    imports: [SequelizeModule.forFeature([Question]), QuestiontagsModule, PicturesModule, VotesModule, FavoritesModule],
    providers: [QuestionsService],
    controllers: [QuestionsController],
    exports: [SequelizeModule, QuestionsService]
})
export class QuestionsModule { }
