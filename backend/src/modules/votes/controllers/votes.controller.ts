import { Controller, Delete, Get, Param } from "@nestjs/common";
import { VotesService } from "../services/votes.service";

@Controller('votes')
export class VotesController {
    constructor(private votesService: VotesService) {
    }

    @Get('check/:idUser/:idQuestion')
    async checkVote(@Param('idUser') idUser: string, @Param('idQuestion') idQuestion: string) {
        try {
            const hasVoted = await this.votesService.hasUserVoted(idUser, idQuestion);
            return { hasVoted };
        }
        catch (error) {
            console.log(error);
        }
    }
}