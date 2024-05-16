import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';

@Module({
    imports: [SequelizeModule.forFeature([Question])],
    providers: [QuestionsService],
    controllers: [QuestionsController],
})
export class QuestionsModule { }
