import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Flag } from '../flag.model';

@Injectable()
export class FlagsService {

    constructor(@InjectModel(Flag) private flagModel: typeof Flag) { }

    async hasUserFlagged(idUser: string, idQuest: string) {
        try {
            const vote = await this.flagModel.findOne({ where: { idUser, idQuest } });

            if (!vote) {
                throw new NotFoundException('User has not reported this question');
            } else {
                return true;
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException('An error occurred while searching for the report');
            }
        }

    }
}
