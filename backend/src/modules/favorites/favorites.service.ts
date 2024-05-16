import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Favorite } from "./favorite.model";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';

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
}