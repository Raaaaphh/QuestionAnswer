import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Picture } from "./picture.model";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';


@Injectable()
export class PicturesService {

    constructor(@InjectModel(Picture) private pictModel: typeof Picture) { }

    async getPicture(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid picture ID');
        }

        const picture = await this.pictModel.findOne({
            where: {
                idPict: id
            }
        });

        if (!picture) {
            throw new ForbiddenException('Picture not found');
        }
        return picture;
    }


    async getPicturesByQuestion(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid question ID');
        }

        const pictures = await this.pictModel.findAll({
            where: {
                idQuest: id
            }
        });

        if (!pictures || pictures.length === 0) {
            throw new ForbiddenException('Pictures not found');
        }
        return pictures;
    }


    async getPicturesByAnswer(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid answer ID');
        }

        const pictures = await this.pictModel.findAll({
            where: {
                idAnsw: id
            }
        });

        if (!pictures || pictures.length === 0) {
            throw new ForbiddenException('Pictures not found');
        }
        return pictures;
    }

    async deletePicture(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid picture ID');
        }

        const picture = await this.pictModel.findOne({
            where: {
                idPict: id
            }
        });

        if (!picture) {
            throw new ForbiddenException('Picture not found');
        }

        await picture.destroy();
        return picture;
    }
}