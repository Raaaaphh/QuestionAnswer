import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import { AnswerCreateDto } from "./dto";
import { AdminGuard } from "src/guards/admin.guard";

@Controller('answers')
export class AnswersController {
    constructor(private answersService: AnswersService) { }

    @Get(':id')
    getAnswer(@Param('id') id: string) {
        return this.answersService.getAnswer(id);
    }

    @Get()
    findAll() {
        return this.answersService.findAll();
    }

    // Get en fonction id Question 

    @Get('findByUser/:id')
    searchAnswersByUser(@Param('id') id: string) {
        return this.answersService.searchAnswersByUser(id);
    }

    @Post('create')
    @UseGuards(AdminGuard)
    createAnswer(@Body() answer: AnswerCreateDto) {
        return this.answersService.createAnswer(answer);
    }

    @Delete(':id')
    deleteAnswer(@Param('id') id: string) {
        return this.answersService.deleteAnswer(id);
    }
}