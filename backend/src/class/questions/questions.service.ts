import { ForbiddenException, Injectable, HttpException, HttpStatus, BadRequestException } from "@nestjs/common";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { QuestionDto } from "./dto/question.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Question } from "./question.model";

@Injectable()
export class QuestionsService {

    constructor(@InjectModel(Question) private questModel: typeof Question) { }

    async getQuestion(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid question ID');
        }

        const question = await this.questModel.findOne({
            where: {
                idQuest: id
            }
        });

        if (!question) {
            throw new ForbiddenException('Question not found');
        }
        return question;
    }


    async createQuestion(quest: QuestionDto) {
        const { v4: uuidv4 } = require("uuid");
        const idQuest = uuidv4();
        console.log(idQuest);

        try {
            const question = await this.questModel.create({
                idQuest: idQuest,
                idUser: quest.idUser,
                content: quest.content,
            });
            console.log("La nouvelle question" + question);
            return question;
        } catch (error) {
            console.log(error);
            throw new HttpException('Erreur lors de la création de la question', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    editQuestion(question: any) {
        return 'Question edited !';
    }

    async deleteQuestion(id: string) {
        const question = await this.questModel.findOne({
            where: {
                idQuest: id
            }
        });
        if (!question) {
            throw new ForbiddenException('Question not found');
        }

        await question.destroy();
    }
}