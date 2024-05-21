import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Picture } from './picture.model';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';

@Module({
    imports: [SequelizeModule.forFeature([Picture])],
    providers: [PicturesService],
    controllers: [PicturesController],
    exports: [SequelizeModule],
})
export class PicturesModule { }
