import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AnswerCreateDto } from "../dto";
import { AnswersService } from "../services/answers.service";
import { AdminGuard } from "../../../guards/admin.guard"
import { AnswerGuard } from "src/guards/answer.guard";

@Controller('answers')
export class AnswersController {
    constructor(private answersService: AnswersService) { }

    @Get(':id')
    getAnswer(@Param('id') id: string) {
        try {
            return this.answersService.getAnswer(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get()
    findAll() {
        try {
            return this.answersService.findAll();
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByQuestion/:id')
    searchAnswersByQuestion(@Param('id') id: string) {
        try {
            return this.answersService.searchAnswersByQuestion(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByUser/:id')
    searchAnswersByUser(@Param('id') id: string) {
        try {
            return this.answersService.searchAnswersByUser(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('create')
    @UseGuards(AnswerGuard)
    createAnswer(@Body() answer: AnswerCreateDto) {
        try {
            return this.answersService.createAnswer(answer);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Delete(':id')
    deleteAnswer(@Param('id') id: string) {
        try {
            return this.answersService.deleteAnswer(id);
        }
        catch (error) {
            console.log(error);
        }
    }
}