import { Question } from "./question.model";
import { QuestionCreateDto, QuestionEditDto } from "./dto";
export declare class QuestionsService {
    private questModel;
    constructor(questModel: typeof Question);
    getQuestion(id: string): Promise<Question>;
    findAll(): Promise<Question[]>;
    searchQuestions(search: string, limit: string): Promise<Question[]>;
    createQuestion(quest: QuestionCreateDto): Promise<Question>;
    editQuestion(question: QuestionEditDto): Promise<Question>;
    deleteQuestion(id: string): Promise<void>;
}
