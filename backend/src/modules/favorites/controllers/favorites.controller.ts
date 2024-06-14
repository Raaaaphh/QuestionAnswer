import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Param, Post, Query } from "@nestjs/common";
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
            throw new HttpException({
                message: 'An error occurred while getting favorites',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('findByQuest/:id')
    async getFavoritesQuestion(@Param('id') id: string) {
        try {
            return await this.favService.getFavoritesQuestion(id);
        }
        catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new HttpException({
                message: 'An error occurred while getting favorites by question',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('findByUser/:id')
    async getFavoritesUser(@Param('id') id: string) {
        try {
            return await this.favService.getFavoritesUser(id);
        }
        catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new HttpException({
                message: 'An error occurred while getting favorites by user',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('notify/:idUser')
    async notifyFavorites(@Param('idUser') idUser: string) {
        try {
            return await this.favService.notifyFavorites(idUser);
        }
        catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new HttpException({
                message: 'An error occurred while notifying favorites',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('check')
    async checkFavorite(@Query('idUser') idUser: string, @Query('idQuest') idQuest: string) {
        try {
            return await this.favService.checkFavorite(idUser, idQuest);
        }
        catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new HttpException({
                message: 'An error occurred while checking favorite',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('add')
    async addFavorite(@Body() favDto: FavoriteDto) {
        try {
            return await this.favService.addFavorite(favDto);
        }
        catch (error) {
            throw new HttpException({
                message: 'An error occurred while adding favorite',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('remove')
    async removeFavorite(@Body() favDto: FavoriteDto) {
        try {
            return await this.favService.removeFavorite(favDto);
        }
        catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            throw new HttpException({
                message: 'An error occurred while removing favorite',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('deleteNotified')
    async deleteNotified(@Body() favDto: FavoriteDto) {
        try {
            return await this.favService.deleteNotified(favDto);
        }
        catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            throw new HttpException({
                message: 'An error occurred while deleting notified favorite',
                error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}