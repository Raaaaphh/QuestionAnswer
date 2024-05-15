import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './tag.model';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
    imports: [SequelizeModule.forFeature([Tag])],
    controllers: [TagsController],
    providers: [TagsService]
})
export class TagsModule { }
