import { Controller, Get, Param } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";

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

}