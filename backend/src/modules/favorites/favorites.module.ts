import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite } from './favorite.model';

@Module({
    imports: [SequelizeModule.forFeature([Favorite])],
    providers: [FavoritesService],
    controllers: [FavoritesController],
})
export class FavoritesModule { }
