import { CanActivate, ExecutionContext } from '@nestjs/common';
import { QuestionsService } from '../modules/questions/services/questions.service';
export declare class AnswerGuard implements CanActivate {
    private questionsService;
    constructor(questionsService: QuestionsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
