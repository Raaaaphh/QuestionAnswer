import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Picture } from './picture.model';
import { PicturesController } from './controllers/pictures.controller';
import { PicturesService } from './services/pictures.service';

@Module({
    imports: [SequelizeModule.forFeature([Picture])],
    providers: [PicturesService],
    controllers: [PicturesController],
    exports: [SequelizeModule],
})
export class PicturesModule { }
