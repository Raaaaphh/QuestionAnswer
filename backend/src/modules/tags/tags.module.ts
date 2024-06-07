import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './tag.model';
import { TagsController } from './controllers/tags.controller';
import { TagsService } from './services/tags.service';

@Module({
    imports: [SequelizeModule.forFeature([Tag])],
    controllers: [TagsController],
    providers: [TagsService],
    exports: [SequelizeModule]
})
export class TagsModule { }
