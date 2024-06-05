import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { Favorite } from "../favorite.model";
import { FavoriteDto } from "../dto/favorite.dto";

@Injectable()
export class FavoritesService {
    constructor(@InjectModel(Favorite) private favModel: typeof Favorite) { }

    async getFavorites() {
        return await this.favModel.findAll();
    }

    async getFavoritesQuestion(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid question ID');
        }

        const favorites = await this.favModel.findAll({
            where: {
                idQuest: id
            }
        });

        if (!favorites) {
            throw new ForbiddenException('Question or User not found');
        }
        return favorites;
    }

    async getFavoritesUser(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid user ID');
        }

        const favorites = await this.favModel.findAll({
            where: {
                idUser: id
            }
        });

        if (!favorites) {
            throw new ForbiddenException('Question or User not found');
        }
        return favorites;
    }

    async notifyFavorites(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid User ID');
        }

        const favorites = await this.favModel.findAll({
            where: {
                idUser: id,
                notified: true
            }
        });
        return favorites;
    }

    async deleteNotified(dto: FavoriteDto) {
        const favorite = await this.favModel.findOne({
            where: {
                idUser: dto.idUser,
                idQuest: dto.idQuest
            }
        });

        if (!favorite) {
            throw new ForbiddenException('Favorite not found');
        }

        favorite.notified = false;
        await favorite.save();
        return favorite;
    }

    async addFavorite(favDto: FavoriteDto) {
        const favorite = await this.favModel.create({
            idUser: favDto.idUser,
            idQuest: favDto.idQuest,
        });

        return favorite;
    }

    async removeFavorite(favDto: FavoriteDto) {
        const favorite = await this.favModel.findOne({
            where: {
                idUser: favDto.idUser,
                idQuest: favDto.idQuest
            }
        });

        if (!favorite) {
            throw new ForbiddenException('Favorite not found');
        }

        await favorite.destroy();
        return favorite;
    }

}