import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AnswerCreateDto } from "./dto";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { Answer } from "./answer.model";
import { InjectModel } from "@nestjs/sequelize";
import { Picture } from "../pictures/picture.model";
import { Sequelize } from "sequelize-typescript";


@Injectable()
export class AnswersService {

    constructor(@InjectModel(Answer) private answModel: typeof Answer, @InjectModel(Picture) private pictureModel: typeof Picture, private readonly sequelize: Sequelize) { }

    async getAnswer(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid answer ID');
        }

        const answer = await this.answModel.findOne({
            where: {
                idAnsw: id
            }
        });

        if (!answer) {
            throw new ForbiddenException('Answer not found');
        }
        return answer;
    }

    findAll() {
        return this.answModel.findAll();
    }

    async searchAnswersByUser(id: string) {
        const answers = await this.answModel.findAll({
            where: {
                idUser: id
            }
        });

        if (!answers || answers.length === 0) {
            throw new ForbiddenException('Answers not found');
        }
        return answers;
    }

    async searchAnswersByQuestion(id: string) {
        const answers = await this.answModel.findAll({
            where: {
                idQuest: id
            }
        });

        if (!answers || answers.length === 0) {
            throw new ForbiddenException('Answers not found');
        }
        return answers;
    }

    async createAnswer(answDto: AnswerCreateDto) {
        const idAnsw = uuidv4();
        console.log(idAnsw);

        const transaction = await this.sequelize.transaction();

        try {
            const answer = await this.answModel.create({
                idAnsw: idAnsw,
                idUser: answDto.idUser,
                idQuest: answDto.idQuest,
                content: answDto.content,
            }, { transaction });

            if (answDto.listPictures) {
                const picturesData = answDto.listPictures.map(picture => ({ idQuest: null, url: picture, idAnsw: idAnsw, idPicture: uuidv4() }));
                await this.pictureModel.bulkCreate(picturesData, { transaction });
            }

            await transaction.commit();
            return answer;
        } catch (error) {
            console.log(error);
            throw new HttpException('Error during the creation of the answer', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteAnswer(id: string) {
        const answer = await this.answModel.findOne({
            where: {
                idAnsw: id
            }
        });
        if (!answer) {
            throw new ForbiddenException('Answer not found');
        }

        await answer.destroy();
    }
}