import { Sequelize } from "sequelize-typescript";
import { Picture } from "src/modules/pictures/picture.model";
import { Answer } from "../answer.model";
import { AnswerCreateDto } from "../dto";
export declare class AnswersService {
    private answModel;
    private pictureModel;
    private readonly sequelize;
    constructor(answModel: typeof Answer, pictureModel: typeof Picture, sequelize: Sequelize);
    getAnswer(id: string): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    searchAnswersByUser(id: string): Promise<Answer[]>;
    searchAnswersByQuestion(id: string): Promise<Answer[]>;
    createAnswer(answDto: AnswerCreateDto): Promise<Answer>;
    deleteAnswer(id: string): Promise<Answer>;
}
