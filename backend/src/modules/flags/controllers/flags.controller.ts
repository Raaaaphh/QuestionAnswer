import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { FlagsService } from '../services/flags.service';

@Controller('flags')
export class FlagsController {
    constructor(private flagsService: FlagsService) { }

    /**
     * Check if a user has flagged a question
     * @param idUser 
     * @param idQuest 
     * @returns 
     */
    @Get('check')
    async checkFlag(@Query('idUser') idUser: string, @Query('idQuest') idQuest: string) {
        try {
            const hasUserFlagged = await this.flagsService.hasUserFlagged(idUser, idQuest);
            return { hasUserFlagged };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('An error occurred while checking the flag', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
