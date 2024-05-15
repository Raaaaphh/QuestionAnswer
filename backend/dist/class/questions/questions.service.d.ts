import { QuestionDto } from "./dto/question.dto";
import { Question } from "./question.model";
export declare class QuestionsService {
    private questModel;
    constructor(questModel: typeof Question);
    getQuestion(id: string): Promise<Question>;
    createQuestion(quest: QuestionDto): Promise<Question>;
    editQuestion(question: any): string;
    deleteQuestion(id: string): Promise<void>;
}
