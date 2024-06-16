import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { QuestionCreateDto, QuestionEditDto, QuestionFlagDto, QuestionVoteDto } from "../dto";
import { QuestionsService } from "../services/questions.service";
import { StudentGuard } from "../../../guards/student.guard";
import { AdminGuard } from "src/guards/admin.guard";

@Controller('questions')
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {
    }

    /**
     * Get a question by id
     * @param id 
     * @returns 
     */
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

    /**
     * Get all questions with limit and page
     * @param limit 
     * @param page 
     * @returns 
     */
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

    /**
     * Get all questions for a user with his id
     * @param id 
     * @returns 
     */
    @Get('getQuestionsForUser/:id')
    getQuestionsForUser(@Param('id') id: string) {
        try {
            return this.questionsService.getQuestionsForUser(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Get all questions with more than 5 flags, with limit and page
     * @param limit 
     * @param page 
     * @returns 
     */
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

    /**
     * Find questions with the search bar, with limit and page
     * @param search 
     * @param limit 
     * @param page 
     * @returns 
     */
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

    /**
     * Get all questions with a filter, like only the question solved, with limit and page
     * @param filter 
     * @param limit 
     * @param page 
     * @returns 
     */
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

    /**
     * Questions with the name of the user, with limit and page
     * @param name 
     * @param limit 
     * @param page 
     * @returns 
     */
    @Get('findByUser/params')
    searchQuestionsByUser(@Query('name') name: string, @Query('limit') limit: string, @Query('page') page: string) {
        try {
            if (name === undefined) {
                throw new Error('Name is required');
            }
            if (limit === undefined) {
                limit = '20';
            }
            if (page === undefined) {
                page = '1';
            }
            return this.questionsService.searchQuestionsByUser(name, limit, page);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Find questions with tags, with limit and page
     * @param tags 
     * @param limit 
     * @param page 
     * @returns 
     */
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

    /**
     * Get all tags for a question
     * @param id 
     * @returns 
     */
    @Get('tagsForQuestion/:id')
    getTagsForQuestion(@Param('id') id: string) {
        try {
            return this.questionsService.getTagsForQuestion(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Get the number of votes for a question 
     * @param id 
     * @returns 
     */
    @Get('getVotes/:idQuest')
    getVotes(@Param('idQuest') id: string) {
        try {
            return this.questionsService.getVotes(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Get the number of flags for a question
     * @param id 
     * @returns 
     */
    @Get('getFlags/:idQuest')
    getFlags(@Param('idQuest') id: string) {
        try {
            return this.questionsService.getFlags(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Get the number of questions for a user 
     * @param id 
     * @returns 
     */
    @Get('getQuestionsByUser/:idUser')
    getQuestionsByUser(@Param('idUser') id: string) {
        try {
            return this.questionsService.getQuestionsByUser(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * Get the number of votes for a user
     * @param id 
     * @returns 
     */
    @Get('getVotesByUser/:idUser')
    getVotesByUser(@Param('idUser') id: string) {
        try {
            return this.questionsService.getVotesByUser(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('getVotesByQuestion/:idQuest')
    getVotesByQuestion(@Param('idQuest') id: string) {
        try {
            return this.questionsService.getVotesByQuestion(id);
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

    /**
     * Set a question as solved
     * @param dto 
     * @returns 
     */
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

    /**
     * Remove all flags for a question 
     * @param id 
     * @returns 
     */
    @Post('removeAllFlags/:idQuest')
    @UseGuards(AdminGuard)
    removeAllFlags(@Param('idQuest') id: string) {
        try {
            return this.questionsService.removeAllFlags(id);
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