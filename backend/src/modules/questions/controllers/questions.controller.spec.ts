import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from '../services/questions.service';
import { BadRequestException, ExecutionContext } from '@nestjs/common';
import { StudentGuard } from '../../../guards/student.guard';
import { QuestionCreateDto, QuestionEditDto } from '../dto';

describe('QuestionsController', () => {
    let controller: QuestionsController;
    let service: QuestionsService;

    const mockQuestService = {
        findAll: jest.fn(),
        getQuestion: jest.fn(),
        findAllWithLimit: jest.fn(),
        searchQuestions: jest.fn(),
        searchQuestionsByFilter: jest.fn(),
        searchQuestionsByUser: jest.fn(),
        searchQuestionsByTags: jest.fn(),
        createQuestion: jest.fn(),
        editQuestion: jest.fn(),
        deleteQuestion: jest.fn(),
    };

    const mockStudentGuard = {
        canActivate: (context: ExecutionContext) => true,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuestionsController],
            providers: [
                { provide: QuestionsService, useValue: mockQuestService },
            ],
        })
            .overrideGuard(StudentGuard).useValue(mockStudentGuard)
            .compile();

        controller = module.get<QuestionsController>(QuestionsController);
        service = module.get<QuestionsService>(QuestionsService);
        jest.resetAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('should call questionsService.findAll', async () => {
            await controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('getQuestion', () => {
        it('should call questionsService.getQuestion with correct id', async () => {
            const id = '1';
            await controller.getQuestion(id);
            expect(service.getQuestion).toHaveBeenCalledWith(id);
        });
    });

    describe('findAllWithLimit', () => {
        it('should call questionsService.findAllWithLimit with correct limit', async () => {
            const limit = '20';
            await controller.findAllWithLimit(limit);
            expect(service.findAllWithLimit).toHaveBeenCalledWith(limit);
        });
    });

    describe('searchQuestions', () => {
        it('should call questionsService.searchQuestions with correct search and limit', async () => {
            const search = 'search';
            const limit = '20';
            await controller.searchQuestions(search, limit);
            expect(service.searchQuestions).toHaveBeenCalledWith(search, limit);
        });
    });

    describe('searchQuestionsByFilter', () => {
        it('should call questionsService.searchQuestionsByFilter with correct filter, limit and order', async () => {
            const filter = 'filter';
            const limit = '20';
            const order = 'order';
            await controller.searchQuestionsByFilter(filter, limit, order);
            expect(service.searchQuestionsByFilter).toHaveBeenCalledWith(filter, limit, order);
        });
    });

    describe('searchQuestionsByUser', () => {
        it('should call questionsService.searchQuestionsByUser with correct id', async () => {
            const id = '1';
            await controller.searchQuestionsByUser(id);
            expect(service.searchQuestionsByUser).toHaveBeenCalledWith(id);
        });
    });

    describe('searchQuestionsByTags', () => {
        it('should call questionsService.searchQuestionsByTags with correct tags', async () => {
            const tags = 'tag1,tag2';
            await controller.searchQuestionsByTags(tags);
            expect(service.searchQuestionsByTags).toHaveBeenCalledWith(['tag1', 'tag2']);
        });

        it('should throw BadRequestException if tags are not provided', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            try {
                await controller.searchQuestionsByTags('');
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message).toBe('Tags query parameter is required');
                expect(consoleSpy).toHaveBeenCalledWith(new BadRequestException('Tags query parameter is required'));
            }
            consoleSpy.mockRestore();
        });

        it('should throw BadRequestException if tags are empty after trimming', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            try {
                await controller.searchQuestionsByTags(' , ');
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message).toBe('At least one tag is required');
                expect(consoleSpy).toHaveBeenCalledWith(new BadRequestException('At least one tag is required'));
            }
            consoleSpy.mockRestore();
        });

        it('should log error if questionsService.searchQuestionsByTags throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            jest.spyOn(service, 'searchQuestionsByTags').mockImplementation(() => { throw new Error('Test Error') });

            try {
                await controller.searchQuestionsByTags('tag1,tag2');
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
            consoleSpy.mockRestore();
        });
    });

    describe('createQuestion', () => {
        it('should call questionsService.createQuestion with correct data', async () => {
            const dto: QuestionCreateDto = { title: 'title', description: 'description', context: 'context', idUser: '1', listTags: ['tag1', 'tag2'] };
            await controller.createQuestion(dto);
            expect(service.createQuestion).toHaveBeenCalledWith(dto);
        });

        it('should log error if questionsService.createQuestion throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            const dto: QuestionCreateDto = { title: 'title', description: 'description', context: 'context', idUser: '1', listTags: ['tag1', 'tag2'] };
            jest.spyOn(service, 'createQuestion').mockImplementation(() => { throw new Error('Test Error') });
            try {
                await controller.createQuestion(dto);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
            consoleSpy.mockRestore();
        });
    });

    describe('editQuestion', () => {
        it('should call questionsService.editQuestion with correct data', async () => {
            const dto: QuestionEditDto = { idQuest: '1', title: 'title', description: 'description', context: 'context', idUser: '1', listTags: ['tag1', 'tag2'] };
            await controller.editQuestion(dto);
            expect(service.editQuestion).toHaveBeenCalledWith(dto);
        });

        it('should log error if questionsService.editQuestion throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            const dto: QuestionEditDto = { idQuest: '1', title: 'title', description: 'description', context: 'context', idUser: '1', listTags: ['tag1', 'tag2'] };
            jest.spyOn(service, 'editQuestion').mockImplementation(() => { throw new Error('Test Error') });
            try {
                await controller.editQuestion(dto);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
            consoleSpy.mockRestore();
        });
    });

    describe('deleteQuestion', () => {
        it('should call questionsService.deleteQuestion with correct id', async () => {
            const id = '1';
            await controller.deleteQuestion(id);
            expect(service.deleteQuestion).toHaveBeenCalledWith(id);
        });

        it('should log error if questionsService.deleteQuestion throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            const id = '1';
            jest.spyOn(service, 'deleteQuestion').mockImplementation(() => { throw new Error('Test Error') });
            try {
                await controller.deleteQuestion(id);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
            consoleSpy.mockRestore();
        });
    });
});
