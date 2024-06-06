import { QuestionCreateDto, QuestionEditDto, QuestionVoteDto } from "../dto";
import { QuestionsService } from "../services/questions.service";
export declare class QuestionsController {
    private questionsService;
    constructor(questionsService: QuestionsService);
    getQuestion(id: string): Promise<import("../question.model").Question>;
    findAll(): Promise<import("../question.model").Question[]>;
    findAllWithLimit(limit: string, page: string): Promise<import("../question.model").Question[]>;
    searchQuestions(search: string, limit: string): Promise<import("../question.model").Question[]>;
    searchQuestionsByFilter(filter: string, limit: string, order: string): Promise<import("../question.model").Question[]>;
    searchQuestionsByUser(id: string): Promise<import("../question.model").Question[]>;
    searchQuestionsByTags(tags: string, limit: string): Promise<import("../question.model").Question[]>;
    createQuestion(quest: QuestionCreateDto): Promise<import("../question.model").Question>;
    setSolved(dto: QuestionVoteDto): Promise<import("../question.model").Question>;
    addVote(dto: QuestionVoteDto): Promise<import("../question.model").Question>;
    removeVote(dto: QuestionVoteDto): Promise<import("../question.model").Question>;
    editQuestion(question: QuestionEditDto): Promise<import("../question.model").Question>;
    deleteQuestion(id: string): Promise<import("../question.model").Question>;
}
