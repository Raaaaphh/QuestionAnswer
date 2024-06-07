import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { QuestionCreateDto, QuestionEditDto, QuestionFlagDto, QuestionVoteDto } from "../dto";
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

    @Get('all/params')
    findAllWithLimit(@Query('limit') limit: string, @Query('page') page: string) {
        try {
            if (limit === undefined) {
                limit = '20';
            }
            if (page === undefined) {
                page = '1';
            }
            return this.questionsService.findAllWithLimit(limit, page);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findReported/params')
    findReportedQuestions(@Query('limit') limit: string, @Query('page') page: string) {
        try {
            if (limit === undefined) {
                limit = '20';
            }
            if (page === undefined) {
                page = '1';
            }
            return this.questionsService.findReportedQuestions(limit, page);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByName/params')
    searchQuestions(@Query('search') search: string, @Query('limit') limit: string, @Query('page') page: string) {
        try {
            if (search === undefined) {
                throw new Error('Search is required');
            }
            if (limit === undefined) {
                limit = '20';
            }
            if (page === undefined) {
                page = '1';
            }
            return this.questionsService.searchQuestions(search, limit, page);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByFilter/params')
    searchQuestionsByFilter(@Query('filter') filter: string, @Query('limit') limit: string, @Query('page') page: string) {
        try {
            if (filter === undefined) {
                throw new Error('Filter is required');
            }
            if (limit === undefined) {
                limit = '20';
            }
            if (page === undefined) {
                page = '1';
            }
            return this.questionsService.searchQuestionsByFilter(filter, limit, page);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByUser/params')
    searchQuestionsByUser(@Query('id') id: string, @Query('limit') limit: string, @Query('page') page: string) {
        try {
            if (id === undefined) {
                throw new Error('User ID is required');
            }
            if (limit === undefined) {
                limit = '20';
            }
            if (page === undefined) {
                page = '1';
            }
            return this.questionsService.searchQuestionsByUser(id, limit, page);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByTags/params')
    async searchQuestionsByTags(@Query('tags') tags: string, @Query('limit') limit: string, @Query('page') page: string) {
        try {
            if (!tags) {
                throw new BadRequestException('Tags query parameter is required');
            }

            const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

            if (tagsArray.length === 0) {
                throw new BadRequestException('At least one tag is required');
            }
            if (limit === undefined) {
                limit = '20';
            }
            if (page === undefined) {
                page = '1';
            }
            return await this.questionsService.searchQuestionsByTags(tagsArray, limit, page);
        }
        catch (error) {
            console.log(error);
            throw error;
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

    @Post('setSolved')
    setSolved(@Body() dto: QuestionVoteDto) {
        try {
            return this.questionsService.setSolved(dto);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('addVote')
    addVote(@Body() dto: QuestionVoteDto) {
        try {
            return this.questionsService.addVote(dto);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('removeVote')
    removeVote(@Body() dto: QuestionVoteDto) {
        try {
            return this.questionsService.removeVote(dto);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('addFlag')
    addFlag(@Body() dto: QuestionFlagDto) {
        try {
            return this.questionsService.addFlag(dto);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('removeFlag')
    removeFlag(@Body() dto: QuestionFlagDto) {
        try {
            return this.questionsService.removeFlag(dto);
        }
        catch (error) {
            console.log(error);
        }
    }

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