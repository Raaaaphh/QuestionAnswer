import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { PicturesModule } from '../pictures/pictures.module';

@Module({
    imports: [SequelizeModule.forFeature([Answer]), PicturesModule],
    providers: [AnswersService],
    controllers: [AnswersController],
})
export class AnswersModule { }
