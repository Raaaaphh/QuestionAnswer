import { QuestionsService } from "./questions.service";
import { QuestionDto } from "./dto/question.dto";
export declare class QuestionsController {
    private questionsService;
    constructor(questionsService: QuestionsService);
    getQuestion(id: string): Promise<import("./question.model").Question>;
    createQuestion(quest: QuestionDto): Promise<import("./question.model").Question>;
    editQuestion(question: any): string;
    deleteQuestion(id: string): Promise<void>;
}
