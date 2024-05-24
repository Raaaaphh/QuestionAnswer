import { Module } from '@nestjs/common';
import { AnswersController } from './controllers/answers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { PicturesModule } from '../pictures/pictures.module';
import { AnswersService } from './services/answers.service';

@Module({
    imports: [SequelizeModule.forFeature([Answer]), PicturesModule],
    providers: [AnswersService],
    controllers: [AnswersController],
})
export class AnswersModule { }
