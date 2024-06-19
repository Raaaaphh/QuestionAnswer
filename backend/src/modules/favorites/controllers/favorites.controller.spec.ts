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
        notifyFavorites: jest.fn(),
        checkFavorite: jest.fn(),
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        deleteNotified: jest.fn(),
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

    describe('notifyFavorites', () => {
        it('should call favoritesService.notifyFavorites with correct data', async () => {
            const idUser = '1';
            await controller.notifyFavorites(idUser);
            expect(service.notifyFavorites).toHaveBeenCalledWith(idUser);
        });
    });

    describe('checkFavorite', () => {
        it('should call favoritesService.checkFavorite with correct data', async () => {
            const idUser = '1';
            const idQuest = '1';
            await controller.checkFavorite(idUser, idQuest);
            expect(service.checkFavorite).toHaveBeenCalledWith(idUser, idQuest);
        });
    });

    describe('addFavorite', () => {
        it('should call favoritesService.addFavorite with correct data', async () => {
            const dto: FavoriteDto = { idUser: '1', idQuest: '1' };
            await controller.addFavorite(dto);
            expect(service.addFavorite).toHaveBeenCalledWith(dto);
        });

    });

    describe('removeFavorite', () => {
        it('should call favoritesService.removeFavorite with correct data', async () => {
            const dto: FavoriteDto = { idUser: '1', idQuest: '1' };
            await controller.removeFavorite(dto);
            expect(service.removeFavorite).toHaveBeenCalledWith(dto);
        });

    });

    describe('deleteNotified', () => {
        it('should call favoritesService.deleteFavorites with correct id', async () => {
            const dto: FavoriteDto = { idUser: '1', idQuest: '1' };
            await controller.deleteNotified(dto);
            expect(service.deleteNotified).toHaveBeenCalledWith(dto);
        });
    });
});
