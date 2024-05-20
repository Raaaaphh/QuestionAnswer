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
    searchQuestions(@Query('search') search: string, @Query('limit') limit: string) {
        if (limit === undefined) {
            limit = '20';
        }
        return this.questionsService.searchQuestions(search, limit);
    }

    @Get('findByFilter/filter?')
    searchQuestionsByFilter(@Query('filter') filter: string, @Query('limit') limit: string, @Query('order') order: string) {
        if (limit === undefined) {
            limit = '20';
        }
        if (order === undefined) {
            order = 'asc';
        }
        if (filter === undefined) {
            throw new Error('Filter is required');
        }
        return this.questionsService.searchQuestionsByFilter(filter, limit, order);
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