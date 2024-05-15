import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import { AnswerCreateDto } from "./dto";

@Controller('answers')
export class AnswersController {
    constructor(private answersService: AnswersService) { }

    @Get(':id')
    getAnswer(@Param('id') id: string) {
        return this.answersService.getAnswer(id);
    }

    @Post('create')
    createAnswer(@Body() answer: AnswerCreateDto) {
        return this.answersService.createAnswer(answer);
    }

    @Delete(':id')
    deleteAnswer(@Param('id') id: string) {
        return this.answersService.deleteAnswer(id);
    }
}