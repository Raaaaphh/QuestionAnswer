import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from './votes.service';

const mockVotesService = {
    hasUserVoted: jest.fn(),
};

describe('FlagsService', () => {
    let service: VotesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VotesService,
                { provide: VotesService, useValue: mockVotesService },
            ],
        }).compile();

        service = module.get<VotesService>(VotesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('hasUserVotes', () => {
        it('should call flagsService.hasUserFlagged with correct idUser and idQuest', async () => {
            const idUser = '1';
            const idQuest = '2';
            await service.hasUserVoted(idUser, idQuest);
            expect(mockVotesService.hasUserVoted).toHaveBeenCalledWith(idUser, idQuest);
        });

        it('should throw an error if an error occurs', async () => {
            const idUser = '1';
            const idQuest = '2';
            jest.spyOn(mockVotesService, 'hasUserVoted').mockRejectedValue(new Error());
            await expect(service.hasUserVoted(idUser, idQuest)).rejects.toThrow();
        });
    });
});
