import { Test, TestingModule } from '@nestjs/testing';
import { FlagsService } from './flags.service';

const mockFlagsService = {
  hasUserFlagged: jest.fn(),
};

describe('FlagsService', () => {
  let service: FlagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlagsService,
        { provide: FlagsService, useValue: mockFlagsService },
      ],
    }).compile();

    service = module.get<FlagsService>(FlagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hasUserFlagged', () => {
    it('should call flagsService.hasUserFlagged with correct idUser and idQuest', async () => {
      const idUser = '1';
      const idQuest = '2';
      await service.hasUserFlagged(idUser, idQuest);
      expect(mockFlagsService.hasUserFlagged).toHaveBeenCalledWith(idUser, idQuest);
    });

    it('should throw an error if an error occurs', async () => {
      const idUser = '1';
      const idQuest = '2';
      jest.spyOn(mockFlagsService, 'hasUserFlagged').mockRejectedValue(new Error());
      await expect(service.hasUserFlagged(idUser, idQuest)).rejects.toThrow();
    });
  });
});
