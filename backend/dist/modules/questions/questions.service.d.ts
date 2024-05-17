import { Question } from "./question.model";
import { QuestionCreateDto, QuestionEditDto } from "./dto";
import { QuestionTag } from "../questiontags/questiontag.model";
export declare class QuestionsService {
    private questModel;
    private questTagModel;
    constructor(questModel: typeof Question, questTagModel: typeof QuestionTag);
    getQuestion(id: string): Promise<Question>;
    findAll(): Promise<Question[]>;
    searchQuestions(search: string, limit: string): Promise<Question[]>;
    searchQuestionsByFilter(filter: string, limit: string, order: string): Promise<Question[]>;
    createQuestion(quest: QuestionCreateDto): Promise<void>;
    editQuestion(question: QuestionEditDto): Promise<Question>;
    deleteQuestion(id: string): Promise<void>;
}
