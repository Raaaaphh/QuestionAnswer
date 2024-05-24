import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionTag } from './questiontag.model';

@Module({
    imports: [SequelizeModule.forFeature([QuestionTag])],
    exports: [SequelizeModule],
})
export class QuestiontagsModule { }
