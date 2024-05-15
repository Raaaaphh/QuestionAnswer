import { AnswersService } from "./answers.service";
import { AnswerCreateDto } from "./dto";
export declare class AnswersController {
    private answersService;
    constructor(answersService: AnswersService);
    getAnswer(id: string): Promise<import("./answer.model").Answer>;
    findAll(): Promise<import("./answer.model").Answer[]>;
    createAnswer(answer: AnswerCreateDto): Promise<import("./answer.model").Answer>;
    deleteAnswer(id: string): Promise<void>;
}
