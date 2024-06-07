import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from '../services/favorites.service';
import { FavoriteDto } from '../dto/favorite.dto';
import { HttpException } from '@nestjs/common';

describe('FavoritesController', () => {
    let controller: FavoritesController;
    let service: FavoritesService;

    const mockFavService = {
        getFavorites: jest.fn(),
        getFavoritesQuestion: jest.fn(),
        getFavoritesUser: jest.fn(),
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FavoritesController],
            providers: [
                { provide: FavoritesService, useValue: mockFavService },
            ],
        }).compile();

        controller = module.get<FavoritesController>(FavoritesController);
        service = module.get<FavoritesService>(FavoritesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getFavorites', () => {
        it('should call favoritesService.getFavorites to have all', async () => {
            await controller.getFavorites();
            expect(service.getFavorites).toHaveBeenCalled();
        });
    });

    describe('getFavoritesQuestion', () => {
        it('should call favoritesService.getFavoritesQuestion with correct id', async () => {
            const id = '1';
            await controller.getFavoritesQuestion(id);
            expect(service.getFavoritesQuestion).toHaveBeenCalledWith(id);
        });
    });

    describe('getFavoritesUser', () => {
        it('should call favoritesService.getFavoritesUser with correct id', async () => {
            const id = '1';
            await controller.getFavoritesUser(id);
            expect(service.getFavoritesUser).toHaveBeenCalledWith(id);
        });
    });

    describe('addFavorite', () => {
        it('should call favoritesService.addFavorite with correct data', async () => {
            const dto: FavoriteDto = { idUser: '1', idQuest: '1' };
            await controller.addFavorite(dto);
            expect(service.addFavorite).toHaveBeenCalledWith(dto);
        });

        it('should throw an error if favoritesService.addFavorite throws', async () => {
            const dto: FavoriteDto = { idUser: '1', idQuest: '1' };
            jest.spyOn(service, 'addFavorite').mockImplementation(() => {
                throw new HttpException('Test Error', 500); // Use the specific HttpException that your service might throw
            });

            await expect(controller.addFavorite(dto)).rejects.toThrow(HttpException);
        });
    });

    describe('removeFavorite', () => {
        it('should call favoritesService.removeFavorite with correct data', async () => {
            const dto: FavoriteDto = { idUser: '1', idQuest: '1' };
            await controller.removeFavorite(dto);
            expect(service.removeFavorite).toHaveBeenCalledWith(dto);
        });

        it('should throw an error if favoritesService.removeFavorite throws', async () => {
            const dto: FavoriteDto = { idUser: '1', idQuest: '1' };
            jest.spyOn(service, 'removeFavorite').mockImplementation(() => {
                throw new HttpException('Test Error', 500); // Use the specific HttpException that your service might throw
            });

            await expect(controller.removeFavorite(dto)).rejects.toThrow(HttpException);
        });
    });
});
