import { AnswerCreateDto } from "./dto";
import { Answer } from "./answer.model";
export declare class AnswersService {
    private answModel;
    constructor(answModel: typeof Answer);
    getAnswer(id: string): string;
    createAnswer(answDto: AnswerCreateDto): Promise<Answer>;
    deleteAnswer(id: string): string;
}
