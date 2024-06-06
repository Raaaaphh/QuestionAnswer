import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Flag } from '../flag.model';

@Injectable()
export class FlagsService {

    constructor(@InjectModel(Flag) private flagModel: typeof Flag) { }

    async hasUserFlagged(idUser: string, idQuest: string) {
        const vote = await this.flagModel.findOne({ where: { idUser, idQuest } });
        if (!vote) {
            throw new BadRequestException('User has not reported this question');
        } else {
            return true;
        }
    }
}
