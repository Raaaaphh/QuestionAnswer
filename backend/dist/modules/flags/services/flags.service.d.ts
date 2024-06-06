import { Flag } from '../flag.model';
export declare class FlagsService {
    private flagModel;
    constructor(flagModel: typeof Flag);
    hasUserFlagged(idUser: string, idQuest: string): Promise<boolean>;
}
