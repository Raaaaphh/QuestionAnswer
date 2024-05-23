import { Module } from '@nestjs/common';
import { FavoritesController } from './controllers/favorites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite } from './favorite.model';
import { FavoritesService } from './services/favorites.service';

@Module({
    imports: [SequelizeModule.forFeature([Favorite])],
    providers: [FavoritesService],
    controllers: [FavoritesController],
})
export class FavoritesModule { }
