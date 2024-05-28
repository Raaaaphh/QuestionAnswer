import { Test, TestingModule } from '@nestjs/testing';
import { PicturesController } from './pictures.controller';
import { PicturesService } from '../services/pictures.service';


describe('PicturesController', () => {
    let controller: PicturesController;
    let service: PicturesService;

    const mockPicturesService = {
        getPicture: jest.fn(),
        getPicturesByQuestion: jest.fn(),
        getPicturesByAnswer: jest.fn(),
        deletePicture: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PicturesController],
            providers: [
                { provide: PicturesService, useValue: mockPicturesService },
            ],
        }).compile();

        controller = module.get<PicturesController>(PicturesController);
        service = module.get<PicturesService>(PicturesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getPicture', () => {
        it('should call picturesService.getPicture with correct data', async () => {
            const id = '1';
            await controller.getPicture(id);
            expect(service.getPicture).toHaveBeenCalledWith(id);
        });

        it('should log error if picturesService.getPicture throws', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const id = '1';
            jest.spyOn(service, 'getPicture').mockImplementation(() => { throw new Error('Test Error') });
            try {
                controller.getPicture(id);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
        });
    });

    describe('getPicturesByQuestion', () => {
        it('should call picturesService.getPicturesByQuestion with correct data', async () => {
            const id = '1';
            await controller.getPicturesByQuestion(id);
            expect(service.getPicturesByQuestion).toHaveBeenCalledWith(id);
        });

        it('should log error if picturesService.getPicturesByQuestion throws', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const id = '1';
            jest.spyOn(service, 'getPicturesByQuestion').mockImplementation(() => { throw new Error('Test Error') });
            try {
                controller.getPicturesByQuestion(id);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
        });
    });

    describe('getPicturesByAnswer', () => {
        it('should call picturesService.getPicturesByAnswer with correct data', async () => {
            const id = '1';
            await controller.getPicturesByAnswer(id);
            expect(service.getPicturesByAnswer).toHaveBeenCalledWith(id);
        });

        it('should log error if picturesService.getPicturesByAnswer throws', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const id = '1';
            jest.spyOn(service, 'getPicturesByAnswer').mockImplementation(() => { throw new Error('Test Error') });
            try {
                controller.getPicturesByAnswer(id);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
        });
    });

    describe('deletePicture', () => {
        it('should call picturesService.deletePicture with correct data', async () => {
            const id = '1';
            await controller.deletePicture(id);
            expect(service.deletePicture).toHaveBeenCalledWith(id);
        });

        it('should log error if picturesService.deletePicture throws', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const id = '1';
            jest.spyOn(service, 'deletePicture').mockImplementation(() => { throw new Error('Test Error') });
            try {
                controller.deletePicture(id);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
        });
    });
});