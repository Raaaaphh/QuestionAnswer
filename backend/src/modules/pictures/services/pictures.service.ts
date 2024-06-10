import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { Picture } from "../picture.model";


@Injectable()
export class PicturesService {

    constructor(@InjectModel(Picture) private pictModel: typeof Picture) { }

    async getPicture(id: string) {
        try {
            if (!isValidUUID(id)) {
                throw new BadRequestException('Invalid picture ID');
            }

            const picture = await this.pictModel.findOne({
                where: {
                    idPict: id
                }
            });

            if (!picture) {
                throw new NotFoundException('Picture not found');
            }
            return picture;
        } catch (error) {
            throw error;
        }
    }

    async getPicturesByQuestion(id: string) {
        try {
            if (!isValidUUID(id)) {
                throw new BadRequestException('Invalid question ID');
            }

            const pictures = await this.pictModel.findAll({
                where: {
                    idQuest: id
                }
            });

            if (!pictures || pictures.length === 0) {
                throw new NotFoundException('Pictures not found');
            }
            return pictures;
        } catch (error) {
            throw error;
        }
    }

    async getPicturesByAnswer(id: string) {
        try {
            if (!isValidUUID(id)) {
                throw new BadRequestException('Invalid answer ID');
            }

            const pictures = await this.pictModel.findAll({
                where: {
                    idAnsw: id
                }
            });

            if (!pictures || pictures.length === 0) {
                throw new NotFoundException('Pictures not found');
            }
            return pictures;
        } catch (error) {
            throw error;
        }
    }

    async deletePicture(id: string) {
        try {
            if (!isValidUUID(id)) {
                throw new BadRequestException('Invalid picture ID');
            }

            const picture = await this.pictModel.findOne({
                where: {
                    idPict: id
                }
            });

            if (!picture) {
                throw new NotFoundException('Picture not found');
            }

            await picture.destroy();
            return picture;
        } catch (error) {
            throw error;
        }
    }
}