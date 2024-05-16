import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FavoriteAddDto } from "./dto/favorite-add.dto";

@Controller('favorites')
export class FavoritesController {
    constructor(private favService: FavoritesService) { }

    @Get()
    async getFavorites() {
        return await this.favService.getFavorites();
    }

    @Get(':id')
    async getFavoritesType(@Param('id') id: string) {
        return await this.favService.getFavoritesType(id);
    }

    @Post('add')
    async addFavorite(@Body() favDto: FavoriteAddDto) {
        return await this.favService.addFavorite(favDto);
    }

}