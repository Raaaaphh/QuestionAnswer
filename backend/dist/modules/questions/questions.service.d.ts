import { Question } from "./question.model";
import { QuestionCreateDto, QuestionEditDto } from "./dto";
import { QuestionTag } from "../questiontags/questiontag.model";
import { Sequelize } from "sequelize-typescript";
import { Picture } from "../pictures/picture.model";
export declare class QuestionsService {
    private questModel;
    private questTagModel;
    private pictureModel;
    private readonly sequelize;
    constructor(questModel: typeof Question, questTagModel: typeof QuestionTag, pictureModel: typeof Picture, sequelize: Sequelize);
    getQuestion(id: string): Promise<Question>;
    findAll(): Promise<Question[]>;
    searchQuestions(search: string, limit: string): Promise<Question[]>;
    searchQuestionsByFilter(filter: string, limit: string, order: string): Promise<Question[]>;
    searchQuestionsByUser(id: string): Promise<Question[]>;
    createQuestion(quest: QuestionCreateDto): Promise<Question>;
    editQuestion(question: QuestionEditDto): Promise<Question>;
    deleteQuestion(id: string): Promise<void>;
    findSimilarWordsCount(title1: string[], title2: string[]): number;
}
