import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { Favorite } from '../favorite.model';
import { FavoritesService } from './favorites.service';
import { FavoriteDto } from '../dto/favorite.dto';

jest.mock('uuid', () => ({
    v4: jest.fn(),
    validate: jest.fn().mockImplementation((id) => id === uuidv4()),
}));


const mockFavoriteModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
};

describe('FavoritesService', () => {
    let service: FavoritesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FavoritesService,
                { provide: getModelToken(Favorite), useValue: mockFavoriteModel },
            ],
        }).compile();

        service = module.get<FavoritesService>(FavoritesService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getFavorites', () => {
        it('should return all favorites', async () => {
            const favorites = [{ id: 1 }, { id: 2 }];
            mockFavoriteModel.findAll.mockResolvedValue(favorites);

            const result = await service.getFavorites();

            expect(mockFavoriteModel.findAll).toHaveBeenCalled();
            expect(result).toEqual(favorites);
        });

        it('should throw an Error if an error occurs', async () => {
            mockFavoriteModel.findAll.mockRejectedValue(new Error('Test error'));

            await expect(service.getFavorites()).rejects.toThrow(Error);
        });
    });

    describe('getFavoritesQuestion', () => {
        it('should return favorites for a question', async () => {
            const id = uuidv4();
            const favorites = [{ idUser: 1, idQuest: id }, { idUser: 2, idQuest: id }];
            mockFavoriteModel.findAll.mockResolvedValue(favorites);

            const result = await service.getFavoritesQuestion(id);

            expect(mockFavoriteModel.findAll).toHaveBeenCalledWith({ where: { idQuest: id } });
            expect(result).toEqual(favorites);
        });

        it('should throw a BadRequestException for an invalid question ID', async () => {
            const id = 'invalid-id';

            await expect(service.getFavoritesQuestion(id)).rejects.toThrow(BadRequestException);
        });

        it('should throw a NotFoundException if no favorites are found', async () => {
            const id = uuidv4();
            mockFavoriteModel.findAll.mockResolvedValue(null);

            await expect(service.getFavoritesQuestion(id)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getFavoritesUser', () => {
        it('should return favorites for a user', async () => {
            const id = uuidv4();
            const favorites = [{ id: 1 }, { id: 2 }];
            mockFavoriteModel.findAll.mockResolvedValue(favorites);

            const result = await service.getFavoritesUser(id);

            expect(mockFavoriteModel.findAll).toHaveBeenCalledWith({ where: { idUser: id } });
            expect(result).toEqual(favorites);
        });

        it('should throw a BadRequestException for an invalid user ID', async () => {
            const id = 'invalid-id';

            await expect(service.getFavoritesUser(id)).rejects.toThrow(BadRequestException);
        });

        it('should throw a NotFoundException if no favorites are found', async () => {
            const id = uuidv4();
            mockFavoriteModel.findAll.mockResolvedValue(null);

            await expect(service.getFavoritesUser(id)).rejects.toThrow(NotFoundException);
        });
    });

    describe('notifyFavorites', () => {
        it('should return favorites for a user', async () => {
            const id = uuidv4();
            const favorites = [{ id: 1 }, { id: 2 }];
            mockFavoriteModel.findAll.mockResolvedValue(favorites);

            const result = await service.notifyFavorites(id);

            expect(mockFavoriteModel.findAll).toHaveBeenCalledWith({ where: { idUser: id, notified: true } });
            expect(result).toEqual(favorites);
        });

        it('should throw a BadRequestException for an invalid user ID', async () => {
            const id = 'invalid-id';

            await expect(service.notifyFavorites(id)).rejects.toThrow(BadRequestException);
        });

    });

    describe('deleteNotified', () => {
        it('should throw NotFoundException if favorite is not found', async () => {
            const dto = { idUser: 'user-id', idQuest: 'question-id' };
            mockFavoriteModel.findOne.mockResolvedValue(null);

            await expect(service.deleteNotified(dto)).rejects.toThrow(NotFoundException);
        });

        it('should update the favorite and return it', async () => {
            const dto: FavoriteDto = { idUser: 'user-id', idQuest: 'question-id' };
            const favorite = { idFav: 'fav-id', idUser: 'user-id', idQuest: 'question-id', notified: true, save: jest.fn() };
            mockFavoriteModel.findOne.mockResolvedValue(favorite);

            const result = await service.deleteNotified(dto);
            expect(mockFavoriteModel.findOne).toHaveBeenCalledWith({ where: { idUser: dto.idUser, idQuest: dto.idQuest } });
            expect(favorite.save).toHaveBeenCalled();
            expect(result).toEqual(favorite);
        });
    });

    describe('checkFavorite', () => {
        it('should return false if favorite does not exist', async () => {
            const idUser = 'user-id';
            const idQuest = 'question-id';
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockFavoriteModel.findOne.mockResolvedValue(null);

            const result = await service.checkFavorite(idUser, idQuest);
            expect(result).toBe(false);
        });

        it('should return true if favorite exists', async () => {
            const favorite = { idFav: 1, idUser: 'user-id', idQuest: 'question-id' }
            const idUser = favorite.idUser;
            const idQuest = favorite.idQuest;
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockFavoriteModel.findOne.mockResolvedValue(favorite);

            const result = await service.checkFavorite(idUser, idQuest);
            expect(result).toBe(true);
        });

        it('should throw BadRequestException if idUser is invalid', async () => {
            const idUser = 'invalid-id';
            const idQuest = 'question-id';
            (isValidUUID as jest.Mock).mockReturnValue(false);
            await expect(service.checkFavorite(idUser, idQuest)).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException if idQuest is invalid', async () => {
            const idUser = 'user-id';
            const idQuest = 'invalid-id';
            (isValidUUID as jest.Mock).mockReturnValue(false);
            await expect(service.checkFavorite(idUser, idQuest)).rejects.toThrow(BadRequestException);
        });
    });


    describe('addFavorite', () => {
        it('should add a favorite', async () => {
            const favDto: FavoriteDto = {
                idUser: uuidv4(),
                idQuest: uuidv4(),
            };
            const favorite = {
                idFav: 1,
                ...favDto,
            };
            mockFavoriteModel.create.mockResolvedValue(favorite);

            const result = await service.addFavorite(favDto);

            expect(mockFavoriteModel.create).toHaveBeenCalledWith({
                idUser: favDto.idUser,
                idQuest: favDto.idQuest,
            });
            expect(result).toEqual(favorite);
        });
    });

    describe('removeFavorite', () => {
        it('should remove a favorite', async () => {
            const favDto: FavoriteDto = {
                idUser: uuidv4(),
                idQuest: uuidv4(),
            };
            const favorite = {
                idFav: 1,
                ...favDto,
                destroy: jest.fn(),
            };
            mockFavoriteModel.findOne.mockResolvedValue(favorite);

            const result = await service.removeFavorite(favDto);

            expect(mockFavoriteModel.findOne).toHaveBeenCalledWith({
                where: {
                    idUser: favDto.idUser,
                    idQuest: favDto.idQuest,
                },
            });
            expect(favorite.destroy).toHaveBeenCalledWith();
            expect(result).toEqual(favorite);
        });

        it('should throw a NotFoundException if the favorite is not found', async () => {
            const favDto: FavoriteDto = {
                idUser: uuidv4(),
                idQuest: uuidv4(),
            };
            mockFavoriteModel.findOne.mockResolvedValue(null);

            await expect(service.removeFavorite(favDto)).rejects.toThrow(NotFoundException);
        });
    });
});
