import { AnswerCreateDto } from "./dto";
import { Answer } from "./answer.model";
import { Picture } from "../pictures/picture.model";
import { Sequelize } from "sequelize-typescript";
export declare class AnswersService {
    private answModel;
    private pictureModel;
    private readonly sequelize;
    constructor(answModel: typeof Answer, pictureModel: typeof Picture, sequelize: Sequelize);
    getAnswer(id: string): Promise<Answer>;
    findAll(): Promise<Answer[]>;
    searchAnswersByUser(id: string): Promise<Answer[]>;
    createAnswer(answDto: AnswerCreateDto): Promise<Answer>;
    deleteAnswer(id: string): Promise<void>;
}
