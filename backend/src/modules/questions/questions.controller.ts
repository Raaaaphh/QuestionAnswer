import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { QuestionCreateDto, QuestionEditDto } from "./dto";
import { StudentGuard } from "src/guards/student.guard";

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

    @Get('all/limit?')
    findAllWithLimit(@Query('limit') limit: string) {
        if (limit === undefined) {
            limit = '20';
        }
        return this.questionsService.findAllWithLimit(limit);
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

    @Get('findByUser/:id')
    searchQuestionsByUser(@Param('id') id: string) {
        return this.questionsService.searchQuestionsByUser(id);
    }

    @Get('findByTags/tags?')
    async searchQuestionsByTags(@Query('tags') tags: string) {
        if (!tags) {
            throw new BadRequestException('Tags query parameter is required');
        }

        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

        if (tagsArray.length === 0) {
            throw new BadRequestException('At least one tag is required');
        }

        return await this.questionsService.searchQuestionsByTags(tagsArray);
    }

    @Post('create')
    @UseGuards(StudentGuard)
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