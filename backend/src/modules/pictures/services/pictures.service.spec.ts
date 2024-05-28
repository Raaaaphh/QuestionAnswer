import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { Picture } from '../picture.model';
import { PicturesService } from './pictures.service';

jest.mock('uuid', () => ({
    ...jest.requireActual('uuid'),
    validate: jest.fn(),
}));

const mockPictureModel = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
};

describe('PicturesService', () => {
    let service: PicturesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PicturesService,
                { provide: getModelToken(Picture), useValue: mockPictureModel },
            ],
        }).compile();

        service = module.get<PicturesService>(PicturesService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getPicture', () => {
        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.getPicture('invalid-id')).rejects.toThrow(BadRequestException);
        });

        it('should throw ForbiddenException if picture is not found', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockPictureModel.findOne.mockResolvedValue(null);

            await expect(service.getPicture('valid-id')).rejects.toThrow(ForbiddenException);
        });

        it('should return the picture if found', async () => {
            const picture = { idPict: 'valid-id' };
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockPictureModel.findOne.mockResolvedValue(picture);

            const result = await service.getPicture('valid-id');
            expect(result).toEqual(picture);
        });
    });

    describe('getPicturesByQuestion', () => {
        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.getPicturesByQuestion('invalid-id')).rejects.toThrow(BadRequestException);
        });

        it('should throw ForbiddenException if no pictures are found', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockPictureModel.findAll.mockResolvedValue([]);

            await expect(service.getPicturesByQuestion('valid-id')).rejects.toThrow(ForbiddenException);
        });

        it('should return the pictures if found', async () => {
            const pictures = [{ idPict: '1' }, { idPict: '2' }];
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockPictureModel.findAll.mockResolvedValue(pictures);

            const result = await service.getPicturesByQuestion('valid-id');
            expect(result).toEqual(pictures);
        });
    });

    describe('getPicturesByAnswer', () => {
        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.getPicturesByAnswer('invalid-id')).rejects.toThrow(BadRequestException);
        });

        it('should throw ForbiddenException if no pictures are found', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockPictureModel.findAll.mockResolvedValue([]);

            await expect(service.getPicturesByAnswer('valid-id')).rejects.toThrow(ForbiddenException);
        });

        it('should return the pictures if found', async () => {
            const pictures = [{ idPict: '1' }, { idPict: '2' }];
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockPictureModel.findAll.mockResolvedValue(pictures);

            const result = await service.getPicturesByAnswer('valid-id');
            expect(result).toEqual(pictures);
        });
    });

    describe('deletePicture', () => {
        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.deletePicture('invalid-id')).rejects.toThrow(BadRequestException);
        });

        it('should throw ForbiddenException if picture is not found', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockPictureModel.findOne.mockResolvedValue(null);

            await expect(service.deletePicture('valid-id')).rejects.toThrow(ForbiddenException);
        });

        it('should delete the picture and return it if found', async () => {
            const picture = { idPict: 'valid-id', destroy: jest.fn() };
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockPictureModel.findOne.mockResolvedValue(picture);

            const result = await service.deletePicture('valid-id');
            expect(picture.destroy).toHaveBeenCalled();
            expect(result).toEqual(picture);
        });
    });
});
