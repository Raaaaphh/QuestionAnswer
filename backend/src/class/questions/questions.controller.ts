import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { QuestionDto } from "./dto/question.dto";

@Controller('questions')
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {
    }

    @Get(':id')
    getQuestion(@Param('id') id: string) {
        return this.questionsService.getQuestion(id);
    }

    @Post('create')
    createQuestion(@Body() quest: QuestionDto) {
        try {
            return this.questionsService.createQuestion(quest);
        } catch (error) {
            console.log(error);
        }
    }

    @Post('edit')
    editQuestion(@Body() question: any) {
        return this.questionsService.editQuestion(question);
    }

    @Delete('delete')
    deleteQuestion(@Body() id: string) {
        return this.questionsService.deleteQuestion(id);
    }
}