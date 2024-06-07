import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { Favorite } from "../favorite.model";
import { FavoriteDto } from "../dto/favorite.dto";

@Injectable()
export class FavoritesService {
    constructor(@InjectModel(Favorite) private favModel: typeof Favorite) { }

    async getFavorites() {
        try {
            return await this.favModel.findAll();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getFavoritesQuestion(id: string) {
        try {
            if (!isValidUUID(id)) {
                throw new BadRequestException('Invalid question ID');
            }

            const favorites = await this.favModel.findAll({
                where: {
                    idQuest: id
                }
            });

            if (!favorites) {
                throw new NotFoundException('Question not found');
            }
            return favorites;
        } catch (error) {
            throw error;
        }
    }

    async getFavoritesUser(id: string) {
        try {
            if (!isValidUUID(id)) {
                throw new BadRequestException('Invalid user ID');
            }

            const favorites = await this.favModel.findAll({
                where: {
                    idUser: id
                }
            });

            if (!favorites) {
                throw new NotFoundException('User not found');
            }
            return favorites;
        } catch (error) {
            throw error;
        }
    }

    async notifyFavorites(id: string) {
        try {
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
        } catch (error) {
            throw error;
        }
    }

    async deleteNotified(dto: FavoriteDto) {
        try {
            const favorite = await this.favModel.findOne({
                where: {
                    idUser: dto.idUser,
                    idQuest: dto.idQuest
                }
            });

            if (!favorite) {
                throw new NotFoundException('Favorite not found');
            }

            favorite.notified = false;
            await favorite.save();
            return favorite;
        } catch (error) {
            throw error;
        }
    }

    async addFavorite(favDto: FavoriteDto) {
        try {
            const favorite = await this.favModel.create({
                idUser: favDto.idUser,
                idQuest: favDto.idQuest,
            });
            return favorite;
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeFavorite(favDto: FavoriteDto) {
        try {
            const favorite = await this.favModel.findOne({
                where: {
                    idUser: favDto.idUser,
                    idQuest: favDto.idQuest
                }
            });

            if (!favorite) {
                throw new NotFoundException('Favorite not found');
            }

            await favorite.destroy();
            return favorite;
        } catch (error) {
            throw error;
        }
    }
}