import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { QuestionCreateDto, QuestionEditDto } from "../dto";
import { QuestionsService } from "../services/questions.service";
import { StudentGuard } from "../../../guards/student.guard";

@Controller('questions')
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {
    }

    @Get(':id')
    getQuestion(@Param('id') id: string) {
        try {
            return this.questionsService.getQuestion(id);
        } catch (error) {
            console.log(error);
        }
    }

    @Get()
    findAll() {
        try {
            return this.questionsService.findAll();
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('all/limit?')
    findAllWithLimit(@Query('limit') limit: string) {
        try {
            if (limit === undefined) {
                limit = '20';
            }
            return this.questionsService.findAllWithLimit(limit);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByName/name?')
    searchQuestions(@Query('search') search: string, @Query('limit') limit: string) {
        try {
            if (search === undefined) {
                throw new Error('Search is required');
            }
            if (limit === undefined) {
                limit = '20';
            }
            return this.questionsService.searchQuestions(search, limit);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByFilter/filter?')
    searchQuestionsByFilter(@Query('filter') filter: string, @Query('limit') limit: string, @Query('order') order: string) {
        try {
            if (filter === undefined) {
                throw new Error('Filter is required');
            }
            if (limit === undefined) {
                limit = '20';
            }
            if (order === undefined) {
                order = 'asc';
            }
            return this.questionsService.searchQuestionsByFilter(filter, limit, order);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByUser/:id')
    searchQuestionsByUser(@Param('id') id: string) {
        try {
            return this.questionsService.searchQuestionsByUser(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByTags/tags?')
    async searchQuestionsByTags(@Query('tags') tags: string) {
        try {
            if (!tags) {
                throw new BadRequestException('Tags query parameter is required');
            }

            const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

            if (tagsArray.length === 0) {
                throw new BadRequestException('At least one tag is required');
            }

            return await this.questionsService.searchQuestionsByTags(tagsArray);
        }
        catch (error) {
            console.log(error);
        }
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

    //Modifier le edit car oublie des tags
    @Post('edit')
    editQuestion(@Body() question: QuestionEditDto) {
        try {
            return this.questionsService.editQuestion(question);

        }
        catch (error) {
            console.log(error);
        }
    }

    @Delete(':id')
    deleteQuestion(@Param('id') id: string) {
        try {
            return this.questionsService.deleteQuestion(id);
        }
        catch (error) {
            console.log(error);
        }
    }
}