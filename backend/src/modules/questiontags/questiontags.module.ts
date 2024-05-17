import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionTag } from './questiontag.model';
import { QuestionTagsService } from './questiontags.service';
import { QuestionTagsController } from './questiontags.controller';

@Module({
    imports: [SequelizeModule.forFeature([QuestionTag])],
    providers: [QuestionTagsService],
    controllers: [QuestionTagsController],
    exports: [SequelizeModule],
})
export class QuestiontagsModule { }
