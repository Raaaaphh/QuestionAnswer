import { Controller, Get, Query } from '@nestjs/common';
import { FlagsService } from '../services/flags.service';

@Controller('flags')
export class FlagsController {
    constructor(private flagsService: FlagsService) {
    }

    @Get('check')
    async checkFlag(@Query('idUser') idUser: string, @Query('idQuest') idQuest: string) {
        try {
            return this.flagsService.hasUserFlagged(idUser, idQuest);
        }
        catch (error) {
            console.log(error);
        }
    }

}
