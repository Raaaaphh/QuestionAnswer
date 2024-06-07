import { Test, TestingModule } from '@nestjs/testing';
import { FlagsController } from './flags.controller';
import { FlagsService } from '../services/flags.service';

describe('FlagsController', () => {
  let controller: FlagsController;
  let service: FlagsService;

  const mockFlagsService = {
    hasUserFlagged: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlagsController],
      providers: [
        { provide: FlagsService, useValue: mockFlagsService },
      ],
    }).compile();

    controller = module.get<FlagsController>(FlagsController);
    service = module.get<FlagsService>(FlagsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('hasUserFlagged', () => {
    it('should call flagsService.hasUserFlagged with correct idUser and idQuest', async () => {
      const idUser = '1';
      const idQuest = '2';
      await controller.checkFlag(idUser, idQuest);
      expect(service.hasUserFlagged).toHaveBeenCalledWith(idUser, idQuest);
    });

    it('should throw an error if an error occurs', async () => {
      const idUser = '1';
      const idQuest = '2';
      jest.spyOn(service, 'hasUserFlagged').mockRejectedValue(new Error());
      await expect(controller.checkFlag(idUser, idQuest)).rejects.toThrow();
    });
  });
});
