import { Body, Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { VotesService } from "../services/votes.service";

@Controller('votes')
export class VotesController {
    constructor(private votesService: VotesService) {
    }

    @Get('check')
    async checkVote(@Query('idUser') idUser: string, @Query('idQuestion') idQuestion: string) {
        try {
            const hasVoted = await this.votesService.hasUserVoted(idUser, idQuestion);
            return { hasVoted };
        }
        catch (error) {
            console.log(error);
        }
    }
}