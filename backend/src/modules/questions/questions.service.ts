import { ForbiddenException, Injectable, HttpException, HttpStatus, BadRequestException } from "@nestjs/common";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { InjectModel } from "@nestjs/sequelize";
import { Question } from "./question.model";
import { QuestionCreateDto, QuestionEditDto } from "./dto";
import { Op } from "sequelize";

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

    findAll() {
        return this.questModel.findAll();
    }

    async searchQuestions(search: string, limit: string) {
        if (limit === undefined) {
            limit = '20';
        }
        const intLimit = parseInt(limit, 10);

        const questions = await this.questModel.findAll({
            where: {
                title: {
                    [Op.like]: `%${search}%`
                }
            },
            limit: intLimit,
        });

        if (!questions || questions.length === 0) {
            throw new ForbiddenException('Questions not found');
        }
        return questions;
    }


    async createQuestion(quest: QuestionCreateDto) {
        const idQuest = uuidv4();
        console.log(idQuest);

        try {
            const question = await this.questModel.create({
                idQuest: idQuest,
                idUser: quest.idUser,
                title: quest.title,
                description: quest.description,
                context: quest.context,
            });
            console.log("New question" + question);
            return question;
        } catch (error) {
            console.log(error);
            throw new HttpException('Error during the creation of the question', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async editQuestion(question: QuestionEditDto) {

        const quest = await this.questModel.findOne({
            where: {
                idQuest: question.idQuest
            }
        });

        if (!quest) {
            throw new ForbiddenException('Question not found');
        }

        if (!isValidUUID(quest.idUser)) {
            throw new BadRequestException('Invalid user ID');
        }

        quest.title = question.title;
        quest.description = question.description;
        quest.context = question.context;
        quest.idUser = question.idUser;

        await quest.save();
        return quest;
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