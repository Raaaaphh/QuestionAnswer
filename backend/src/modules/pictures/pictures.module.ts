import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Picture } from './picture.model';

@Module({
    imports: [SequelizeModule.forFeature([Picture])],
    exports: [SequelizeModule],
})
export class PicturesModule { }
