import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AnswerCreateDto } from 'src/modules/answers/dto';
import { QuestionsService } from '../modules/questions/services/questions.service';

/**
 * Guard that checks if the user is authorized to answer a question
 * @returns {boolean} - True if the user is authorized to answer the question, false otherwise
 */
@Injectable()
export class AnswerGuard implements CanActivate {
    constructor(private questionsService: QuestionsService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const answer: AnswerCreateDto = request.body;

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const question = await this.questionsService.getQuestion(answer.idQuest);

        if (question.idUser !== user.idUser && user.role !== 'SuperAdmin' && user.role !== 'Lecturer') {
            throw new ForbiddenException('User is not authorized to access this resource');
        }

        return true;
    }
}
