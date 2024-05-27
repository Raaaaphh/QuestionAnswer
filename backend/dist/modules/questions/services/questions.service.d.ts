import { Sequelize } from "sequelize-typescript";
import { Question } from "../question.model";
import { QuestionCreateDto, QuestionEditDto, QuestionVoteDto } from "../dto";
import { QuestionTag } from "../../questiontags/questiontag.model";
import { Picture } from "../../pictures/picture.model";
import { Vote } from "src/modules/votes/vote.model";
export declare class QuestionsService {
    private questModel;
    private questTagModel;
    private pictureModel;
    private voteModel;
    private readonly sequelize;
    constructor(questModel: typeof Question, questTagModel: typeof QuestionTag, pictureModel: typeof Picture, voteModel: typeof Vote, sequelize: Sequelize);
    getQuestion(id: string): Promise<Question>;
    findAll(): Promise<Question[]>;
    findAllWithLimit(limit: string): Promise<Question[]>;
    searchQuestions(search: string, limit: string): Promise<Question[]>;
    searchQuestionsByFilter(filter: string, limit: string, order: string): Promise<Question[]>;
    searchQuestionsByUser(id: string): Promise<Question[]>;
    searchQuestionsByTags(tags: string[]): Promise<Question[]>;
    createQuestion(quest: QuestionCreateDto): Promise<Question>;
    addVote(dto: QuestionVoteDto): Promise<Question>;
    removeVote(dto: QuestionVoteDto): Promise<Question>;
    editQuestion(question: QuestionEditDto): Promise<Question>;
    deleteQuestion(id: string): Promise<Question>;
    findSimilarWordsCount(title1: string[], title2: string[]): number;
}
