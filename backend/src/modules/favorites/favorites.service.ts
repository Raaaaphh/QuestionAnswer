import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Favorite } from "./favorite.model";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { FavoriteAddDto } from "./dto/favorite-add.dto";

@Injectable()
export class FavoritesService {
    constructor(@InjectModel(Favorite) private favModel: typeof Favorite) { }

    async getFavorites() {
        return await this.favModel.findAll();
    }

    async getFavoritesType(id: string) {
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

    async addFavorite(favDto: FavoriteAddDto) {
        if (!isValidUUID(favDto.idUser) || !isValidUUID(favDto.idQuest)) {
            throw new BadRequestException('Invalid user or question ID');
        }

        const favorite = await this.favModel.create({
            idUser: favDto.idUser,
            idQuest: favDto.idQuest,
        });

        return favorite;
    }

}