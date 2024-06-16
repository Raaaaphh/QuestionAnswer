import { Body, Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { VotesService } from "../services/votes.service";

@Controller('votes')
export class VotesController {
    constructor(private votesService: VotesService) {
    }

    /**
     * Check if a user has voted a question
     * @param idUser 
     * @param idQuest 
     * @returns 
     */
    @Get('check')
    async checkVote(@Query('idUser') idUser: string, @Query('idQuest') idQuest: string) {
        try {
            return this.votesService.hasUserVoted(idUser, idQuest);
        }
        catch (error) {
            console.log(error);
        }
    }
}