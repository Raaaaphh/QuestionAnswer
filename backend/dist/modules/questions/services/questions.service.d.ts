import { Sequelize } from "sequelize-typescript";
import { Question } from "../question.model";
import { QuestionCreateDto, QuestionEditDto, QuestionFlagDto, QuestionVoteDto } from "../dto";
import { QuestionTag } from "../../questiontags/questiontag.model";
import { Picture } from "../../pictures/picture.model";
import { Vote } from "../../votes/vote.model";
import { Favorite } from "../../favorites/favorite.model";
import { Flag } from "../../flags/flag.model";
export declare class QuestionsService {
    private questModel;
    private questTagModel;
    private pictureModel;
    private voteModel;
    private favoriteModel;
    private flagModel;
    private readonly sequelize;
    constructor(questModel: typeof Question, questTagModel: typeof QuestionTag, pictureModel: typeof Picture, voteModel: typeof Vote, favoriteModel: typeof Favorite, flagModel: typeof Flag, sequelize: Sequelize);
    getQuestion(id: string): Promise<Question>;
    findAll(): Promise<Question[]>;
    findAllWithLimit(limit: string, page: string): Promise<Question[]>;
    searchQuestions(search: string, limit: string): Promise<Question[]>;
    searchQuestionsByFilter(filter: string, limit: string): Promise<Question[]>;
    searchQuestionsByUser(id: string): Promise<Question[]>;
    searchQuestionsByTags(tags: string[], limit: string): Promise<Question[]>;
    createQuestion(quest: QuestionCreateDto): Promise<Question>;
    setSolved(dto: QuestionVoteDto): Promise<Question>;
    addVote(dto: QuestionVoteDto): Promise<Question>;
    removeVote(dto: QuestionVoteDto): Promise<Question>;
    addFlag(dto: QuestionFlagDto): Promise<{
        status: string;
        message: string;
    }>;
    removeFlag(dto: QuestionFlagDto): Promise<{
        status: string;
        message: string;
    }>;
    editQuestion(question: QuestionEditDto): Promise<Question>;
    deleteQuestion(id: string): Promise<Question>;
    findSimilarWordsCount(title1: string[], title2: string[]): number;
}
