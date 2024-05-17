import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { QuestionCreateDto, QuestionEditDto } from "./dto";

@Controller('questions')
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {
    }

    @Get(':id')
    getQuestion(@Param('id') id: string) {
        return this.questionsService.getQuestion(id);
    }

    @Get()
    findAll() {
        return this.questionsService.findAll();
    }

    @Get('findByName/name?')
    searchQuestions(@Query('search') search: string) {
        return this.questionsService.searchQuestions(search);
    }


    @Post('create')
    createQuestion(@Body() quest: QuestionCreateDto) {
        try {
            return this.questionsService.createQuestion(quest);
        } catch (error) {
            console.log(error);
        }
    }

    @Post('edit')
    editQuestion(@Body() question: QuestionEditDto) {
        return this.questionsService.editQuestion(question);
    }

    @Delete(':id')
    deleteQuestion(@Param('id') id: string) {
        return this.questionsService.deleteQuestion(id);
    }
}