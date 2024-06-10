import { Test, TestingModule } from '@nestjs/testing';
import { VotesController } from './votes.controller';
import { VotesService } from '../services/votes.service';


describe('VotesController', () => {
    let controller: VotesController;
    let service: VotesService;

    const mockVotesService = {
        hasUserVoted: jest.fn(),
    };


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VotesController],
            providers: [
                { provide: VotesService, useValue: mockVotesService },
            ],
        }).compile();

        controller = module.get<VotesController>(VotesController);
        service = module.get<VotesService>(VotesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('checkVote', () => {
        it('should call votesService.check with correct idUser and idQuestion', async () => {
            const idUser = '1';
            const idQuestion = '1';
            await controller.checkVote(idUser, idQuestion);
            expect(service.hasUserVoted).toHaveBeenCalledWith(idUser, idQuestion);
        });
    });
});
