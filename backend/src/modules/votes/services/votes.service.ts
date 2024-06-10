import { BadRequestException, Injectable } from "@nestjs/common";
import { Vote } from "../vote.model";
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';

@Injectable()
export class VotesService {
    constructor(@InjectModel(Vote) private voteModel: typeof Vote) { }

    async hasUserVoted(idUser: string, idQuest: string) {
        const vote = await this.voteModel.findOne({ where: { idUser, idQuest } });
        if (!vote) {
            throw new BadRequestException('User has not voted');
        } else {
            return true;
        }
    }

}