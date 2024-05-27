import { ForbiddenException, Injectable, HttpException, HttpStatus, BadRequestException } from "@nestjs/common";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Question } from "../question.model";
import { QuestionCreateDto, QuestionEditDto, QuestionVoteDto } from "../dto";
import { QuestionTag } from "../../questiontags/questiontag.model";
import { Picture } from "../../pictures/picture.model";
import { Vote } from "src/modules/votes/vote.model";

@Injectable()
export class QuestionsService {

    constructor(@InjectModel(Question) private questModel: typeof Question, @InjectModel(QuestionTag) private questTagModel: typeof QuestionTag, @InjectModel(Picture) private pictureModel: typeof Picture, @InjectModel(Vote) private voteModel: typeof Vote, private readonly sequelize: Sequelize) { }

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

    async findAllWithLimit(limit: string) {
        const intLimit = parseInt(limit, 10);

        const questions = await this.questModel.findAll({
            limit: intLimit
        });

        if (!questions || questions.length === 0) {
            throw new ForbiddenException('Questions not found');
        }
        return questions;
    }

    async searchQuestions(search: string, limit: string) {
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


    async searchQuestionsByFilter(filter: string, limit: string, order: string) {
        const intLimit = parseInt(limit, 10);

        const questions = await this.questModel.findAll({
            limit: intLimit,
            order: [[filter, order]]
        });

        if (!questions || questions.length === 0) {
            throw new ForbiddenException('Questions not found');
        }
        return questions;
    }

    async searchQuestionsByUser(id: string) {
        const questions = await this.questModel.findAll({
            where: {
                idUser: id
            }
        });

        if (!questions || questions.length === 0) {
            throw new ForbiddenException('Questions not found');
        }
        return questions;
    }

    async searchQuestionsByTags(tags: string[]) {
        try {
            const questions = await this.questModel.findAll({
                include: [
                    {
                        model: QuestionTag,
                        where: {
                            idTag: {
                                [Op.in]: tags,
                            },
                        },
                    },
                ],
                group: ['Question.idQuest'],
                having: this.sequelize.literal(`COUNT(DISTINCT \`QuestionTags\`.\`idTag\`) = ${tags.length}`)
            });

            if (questions.length === 0) {
                throw new HttpException('No questions found for the given tags', HttpStatus.NOT_FOUND);
            }

            return questions;
        } catch (error) {
            console.error(error);
            throw new HttpException('Error while searching questions by tags', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async createQuestion(quest: QuestionCreateDto) {
        const idQuest = uuidv4();

        const transaction = await this.sequelize.transaction();
        try {
            if (quest.title.length > 100) {
                throw new HttpException('The title is too long', HttpStatus.BAD_REQUEST);
            }

            const newTitleWords = quest.title.toLowerCase().split(' ').filter(word => word.length > 0)

            const existingQuestions = await this.questModel.findAll();

            for (const existingQuestion of existingQuestions) {
                const existingTitleWords = existingQuestion.title.toLowerCase().split(' ').filter(word => word.length > 0)
                const similarWordsCount = this.findSimilarWordsCount(newTitleWords, existingTitleWords);

                if (similarWordsCount >= 80) {
                    throw new HttpException('A question with a similar title already exists', HttpStatus.CONFLICT);
                }
            }

            const question = await this.questModel.create({
                idQuest: idQuest,
                idUser: quest.idUser,
                title: quest.title,
                description: quest.description,
                context: quest.context,
            }, { transaction });

            const tagsData = quest.listTags.map(tag => ({ idQuest: idQuest, idTag: tag }));
            await this.questTagModel.bulkCreate(tagsData, { transaction });

            if (quest.listPictures) {
                const picturesData = quest.listPictures.map(picture => ({ idQuest: idQuest, url: picture, idAnsw: null, idPicture: uuidv4() }));
                await this.pictureModel.bulkCreate(picturesData, { transaction });
            }

            await transaction.commit();
            return question;
        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new HttpException(error.message || 'Error during the creation of the question', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addVote(dto: QuestionVoteDto) {
        const idVote = uuidv4();
        const { idUser, idQuest } = dto;

        const transaction = await this.sequelize.transaction();
        try {
            const existingVote = await this.voteModel.findOne({
                where: { idUser, idQuest },
                transaction,
            });

            if (existingVote) {
                throw new HttpException('User has already voted for this question', HttpStatus.BAD_REQUEST);
            }

            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });

            if (!quest) {
                throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
            }

            quest.votes += 1;
            await quest.save({ transaction });

            await this.voteModel.create({
                idVote,
                idUser,
                idQuest,
            }, { transaction });

            await transaction.commit();
            return quest;
        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new HttpException(error.message || 'Error during the upload of votes', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async removeVote(dto: QuestionVoteDto) {
        const { idUser, idQuest } = dto;
        const transaction = await this.sequelize.transaction();
        try {
            const vote = await this.voteModel.findOne({
                where: { idUser, idQuest },
                transaction,
            });

            if (!vote) {
                throw new HttpException('Vote not found', HttpStatus.NOT_FOUND);
            }

            const quest = await this.questModel.findOne({
                where: { idQuest },
                transaction,
            });

            if (!quest) {
                throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
            }

            quest.votes -= 1;
            await quest.save({ transaction });

            await this.voteModel.destroy({
                where: { idVote: vote.idVote },
                transaction,
            });

            await transaction.commit();
            return quest;
        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new HttpException(error.message || 'Error during the removal of vote', HttpStatus.INTERNAL_SERVER_ERROR);
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
        return question;
    }

    findSimilarWordsCount(title1: string[], title2: string[]): number {
        const set1 = new Set(title1);
        const set2 = new Set(title2);
        let similarCount = 0;

        set1.forEach(word => {
            if (set2.has(word)) {
                similarCount++;
            }
        });

        const totalWords = Math.max(title1.length, title2.length);
        return (similarCount / totalWords) * 100;
    }

}