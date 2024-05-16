import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answer.model';

@Module({
    imports: [SequelizeModule.forFeature([Answer])],
    providers: [AnswersService],
    controllers: [AnswersController],
})
export class AnswersModule { }
