import { Vote } from "../vote.model";
export declare class VotesService {
    private voteModel;
    constructor(voteModel: typeof Vote);
    hasUserVoted(idUser: string, idQuest: string): Promise<boolean>;
}
