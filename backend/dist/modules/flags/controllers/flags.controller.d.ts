import { FlagsService } from '../services/flags.service';
export declare class FlagsController {
    private flagsService;
    constructor(flagsService: FlagsService);
    checkFlag(idUser: string, idQuest: string): Promise<{
        hasUserFlagged: boolean;
    }>;
}
