import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { FavoriteDto } from "../dto/favorite.dto";
import { FavoritesService } from "../services/favorites.service";

@Controller('favorites')
export class FavoritesController {
    constructor(private favService: FavoritesService) { }

    @Get()
    async getFavorites() {
        try {
            return await this.favService.getFavorites();
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByQuest/:id')
    async getFavoritesQuestion(@Param('id') id: string) {
        try {
            return await this.favService.getFavoritesQuestion(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByUser/:id')
    async getFavoritesUser(@Param('id') id: string) {
        try {
            return await this.favService.getFavoritesUser(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('add')
    async addFavorite(@Body() favDto: FavoriteDto) {
        try {
            return await this.favService.addFavorite(favDto);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('remove')
    async removeFavorite(@Body() favDto: FavoriteDto) {
        try {
            return await this.favService.removeFavorite(favDto);
        }
        catch (error) {
            console.log(error);
        }
    }

}