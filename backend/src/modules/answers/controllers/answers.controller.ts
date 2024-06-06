import { BadRequestException, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { AnswerCreateDto } from "../dto";
import { AnswersService } from "../services/answers.service";
import { AnswerGuard } from "../../../guards/answer.guard";

@Controller('answers')
export class AnswersController {
    constructor(private answersService: AnswersService) { }

    @Get(':id')
    async getAnswer(@Param('id') id: string) {
        try {
            const answer = await this.answersService.getAnswer(id);
            return answer;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            } else if (error instanceof ForbiddenException) {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN);
            } else {
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Get()
    async findAll() {
        try {
            const answers = await this.answersService.findAll();
            return answers;
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('findByQuestion/:id')
    async searchAnswersByQuestion(@Param('id') id: string) {
        try {
            const answers = await this.answersService.searchAnswersByQuestion(id);
            return answers;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN);
            } else {
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Get('findByUser/:id')
    async searchAnswersByUser(@Param('id') id: string) {
        try {
            const answers = await this.answersService.searchAnswersByUser(id);
            return answers;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN);
            } else {
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Post('create')
    @UseGuards(AnswerGuard)
    async createAnswer(@Body() answer: AnswerCreateDto) {
        try {
            const createdAnswer = await this.answersService.createAnswer(answer);
            return createdAnswer;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Delete(':id')
    async deleteAnswer(@Param('id') id: string) {
        try {
            const deletedAnswer = await this.answersService.deleteAnswer(id);
            return deletedAnswer;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN);
            } else {
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
