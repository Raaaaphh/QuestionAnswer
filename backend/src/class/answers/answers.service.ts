import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AnswerCreateDto } from "./dto";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { Answer } from "./answer.model";
import { InjectModel } from "@nestjs/sequelize";


@Injectable()
export class AnswersService {

    constructor(@InjectModel(Answer) private answModel: typeof Answer) { }

    getAnswer(id: string) {
        return `This action returns a #${id} answer`;
    }

    async createAnswer(answDto: AnswerCreateDto) {
        const idAnsw = uuidv4();
        console.log(idAnsw);

        try {
            const answer = await this.answModel.create({
                idAnsw: idAnsw,
                idUser: answDto.idUser,
                idQuest: answDto.idQuest,
                content: answDto.content,
            });
            console.log("La nouvelle reponse" + answer);
            return answer;

        } catch (error) {
            console.log(error);
            throw new HttpException('Erreur lors de la création de la question', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    deleteAnswer(id: string) {
        return `This action removes a #${id} answer`;
    }
}