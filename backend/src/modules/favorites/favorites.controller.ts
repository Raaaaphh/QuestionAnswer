import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FavoriteDto } from "./dto/favorite.dto";

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

    @Get(':id')
    async getFavoritesType(@Param('id') id: string) {
        try {
            return await this.favService.getFavoritesType(id);
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