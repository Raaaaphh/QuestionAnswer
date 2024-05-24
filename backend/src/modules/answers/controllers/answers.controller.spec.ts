import { Test, TestingModule } from '@nestjs/testing';
import { AnswersController } from './answers.controller';
import { AnswersService } from '../services/answers.service';
import { AnswerCreateDto } from '../dto';
import { ExecutionContext } from '@nestjs/common';
import { AdminGuard } from '../../../guards/admin.guard';

describe('AnswersController', () => {
    let controller: AnswersController;
    let service: AnswersService;

    const mockAnswersService = {
        getAnswer: jest.fn(),
        findAll: jest.fn(),
        searchAnswersByQuestion: jest.fn(),
        searchAnswersByUser: jest.fn(),
        createAnswer: jest.fn(),
        deleteAnswer: jest.fn(),
    };

    const mockAdminGuard = {
        canActivate: (context: ExecutionContext) => {
            return true;
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AnswersController],
            providers: [
                { provide: AnswersService, useValue: mockAnswersService },
            ],
        })
            .overrideGuard(AdminGuard)
            .useValue(mockAdminGuard)
            .compile();

        controller = module.get<AnswersController>(AnswersController);
        service = module.get<AnswersService>(AnswersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAnswer', () => {
        it('should call answersService.getAnswer with correct id', async () => {
            const id = '1';
            await controller.getAnswer(id);
            expect(service.getAnswer).toHaveBeenCalledWith(id);
        });
    });

    describe('findAll', () => {
        it('should call answersService.findAll', async () => {
            await controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('searchAnswersByQuestion', () => {
        it('should call answersService.searchAnswersByQuestion with correct id', async () => {
            const id = '1';
            await controller.searchAnswersByQuestion(id);
            expect(service.searchAnswersByQuestion).toHaveBeenCalledWith(id);
        });
    });

    describe('searchAnswersByUser', () => {
        it('should call answersService.searchAnswersByUser with correct id', async () => {
            const id = '1';
            await controller.searchAnswersByUser(id);
            expect(service.searchAnswersByUser).toHaveBeenCalledWith(id);
        });
    });

    describe('createAnswer', () => {
        it('should call answersService.createAnswer with correct data', async () => {
            const dto: AnswerCreateDto = { content: 'content', idQuest: '1', idUser: '1' };
            await controller.createAnswer(dto);
            expect(service.createAnswer).toHaveBeenCalledWith(dto);
        });
    });

    describe('deleteAnswer', () => {
        it('should call answersService.deleteAnswer with correct id', async () => {
            const id = '1';
            await controller.deleteAnswer(id);
            expect(service.deleteAnswer).toHaveBeenCalledWith(id);
        });
    });
});
