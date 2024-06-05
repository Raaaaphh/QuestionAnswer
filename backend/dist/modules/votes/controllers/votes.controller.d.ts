import { VotesService } from "../services/votes.service";
export declare class VotesController {
    private votesService;
    constructor(votesService: VotesService);
    checkVote(idUser: string, idQuest: string): Promise<boolean>;
}
