import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from '../services/questions.service';
import { BadRequestException, ExecutionContext } from '@nestjs/common';
import { StudentGuard } from '../../../guards/student.guard';
import { QuestionCreateDto, QuestionEditDto, QuestionFlagDto, QuestionVoteDto } from '../dto';

describe('QuestionsController', () => {
    let controller: QuestionsController;
    let service: QuestionsService;

    const mockQuestService = {
        findAll: jest.fn(),
        getQuestion: jest.fn(),
        findAllWithLimit: jest.fn(),
        getQuestionsForUser: jest.fn(),
        findReportedQuestions: jest.fn(),
        searchQuestions: jest.fn(),
        searchQuestionsByFilter: jest.fn(),
        searchQuestionsByUser: jest.fn(),
        searchQuestionsByTags: jest.fn(),
        getTagsForQuestion: jest.fn(),
        getVotes: jest.fn(),
        getFlags: jest.fn(),
        getQuestionsByUser: jest.fn(),
        getVotesByUser: jest.fn(),
        getVotesByQuestion: jest.fn(),
        createQuestion: jest.fn(),
        setSolved: jest.fn(),
        addVote: jest.fn(),
        removeVote: jest.fn(),
        addFlag: jest.fn(),
        removeFlag: jest.fn(),
        removeAllFlags: jest.fn(),
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
            await controller.findAllWithLimit(limit, '1');
            expect(service.findAllWithLimit).toHaveBeenCalledWith(limit, '1');
        });
    });

    describe('getQuestionsForUser', () => {
        it('should call questionsService.getQuestionsForUser with correct id', async () => {
            const id = '1';
            await controller.getQuestionsForUser(id);
            expect(service.getQuestionsForUser).toHaveBeenCalledWith(id);
        });
    });

    describe('findReportedQuestions', () => {
        it('should call questionsService.findReportedQuestions', async () => {
            await controller.findReportedQuestions('20', '1');
            expect(service.findReportedQuestions).toHaveBeenCalled();
        });
    });

    describe('searchQuestions', () => {
        it('should call questionsService.searchQuestions with correct search and limit', async () => {
            const search = 'search';
            const limit = '20';
            await controller.searchQuestions(search, limit, '1');
            expect(service.searchQuestions).toHaveBeenCalledWith(search, limit, '1');
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
            await controller.searchQuestionsByUser(id, '20', '1');
            expect(service.searchQuestionsByUser).toHaveBeenCalledWith(id, '20', '1');
        });
    });

    describe('searchQuestionsByTags', () => {
        it('should call questionsService.searchQuestionsByTags with correct tags', async () => {
            const tags = 'tag1,tag2';
            await controller.searchQuestionsByTags(tags, '20', '1');
            expect(service.searchQuestionsByTags).toHaveBeenCalledWith(['tag1', 'tag2'], '20', '1');
        });

        it('should throw BadRequestException if tags are not provided', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            try {
                await controller.searchQuestionsByTags('', '20', '1');
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
                await controller.searchQuestionsByTags(' , ', '20', '1');
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
                await controller.searchQuestionsByTags('tag1,tag2', '20', '1');
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
            consoleSpy.mockRestore();
        });
    });

    describe('getTagsForQuestion', () => {
        it('should call questionsService.getTagsForQuestion with correct id', async () => {
            const id = '1';
            await controller.getTagsForQuestion(id);
            expect(service.getTagsForQuestion).toHaveBeenCalledWith(id);
        });
    });

    describe('getVotes', () => {
        it('should call questionsService.getVotes with correct id', async () => {
            const id = '1';
            await controller.getVotes(id);
            expect(service.getVotes).toHaveBeenCalledWith(id);
        });
    });

    describe('getFlags', () => {
        it('should call questionsService.getFlags with correct id', async () => {
            const id = '1';
            await controller.getFlags(id);
            expect(service.getFlags).toHaveBeenCalledWith(id);
        });
    });

    describe('getQuestionsByUser', () => {
        it('should call questionsService.getQuestionsByUser with correct id', async () => {
            const id = '1';
            await controller.getQuestionsByUser(id);
            expect(service.getQuestionsByUser).toHaveBeenCalledWith(id);
        });
    });

    describe('getVotesByUser', () => {
        it('should call questionsService.getVotesByUser with correct id', async () => {
            const id = '1';
            await controller.getVotesByUser(id);
            expect(service.getVotesByUser).toHaveBeenCalledWith(id);
        });
    });

    describe('getVoteByQuestion', () => {
        it('should call questionsService.getVoteByQuestion with correct id', async () => {
            const id = '1';
            await controller.getVotesByQuestion(id);
            expect(service.getVotesByQuestion).toHaveBeenCalledWith(id);
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

    describe('setSolved', () => {
        it('should call questionsService.setSolved with correct id', async () => {
            const dto: QuestionVoteDto = { idQuest: '1', idUser: '1' };
            await controller.setSolved(dto);
            expect(service.setSolved).toHaveBeenCalledWith(dto);
        });

        it('should log error if questionsService.setSolved throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            const dto: QuestionVoteDto = { idQuest: '1', idUser: '1' };
            jest.spyOn(service, 'setSolved').mockImplementation(() => { throw new Error('Test Error') });
            try {
                await controller.setSolved(dto);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
            consoleSpy.mockRestore();
        });
    });

    describe('addVote', () => {
        it('should call questionsService.addVote with correct data', async () => {
            const dto: QuestionVoteDto = { idQuest: '1', idUser: '1' };
            await controller.addVote(dto);
            expect(service.addVote).toHaveBeenCalledWith(dto);
        });

        it('should log error if questionsService.addVote throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            const dto: QuestionVoteDto = { idQuest: '1', idUser: '1' };
            jest.spyOn(service, 'addVote').mockImplementation(() => { throw new Error('Test Error') });
            try {
                await controller.addVote(dto);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
            consoleSpy.mockRestore();
        });
    });

    describe('removeVote', () => {
        it('should call questionsService.removeVote with correct data', async () => {
            const dto: QuestionVoteDto = { idQuest: '1', idUser: '1' };
            await controller.removeVote(dto);
            expect(service.removeVote).toHaveBeenCalledWith(dto);
        });

        it('should log error if questionsService.removeVote throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            const dto: QuestionVoteDto = { idQuest: '1', idUser: '1' };
            jest.spyOn(service, 'removeVote').mockImplementation(() => { throw new Error('Test Error') });
            try {
                await controller.removeVote(dto);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
            consoleSpy.mockRestore();
        });
    });

    describe('addFlag', () => {
        it('should call questionsService.addFlag with correct data', async () => {
            const dto: QuestionFlagDto = { idQuest: '1', idUser: '1', flagType: 'Spam' };
            await controller.addFlag(dto);
            expect(service.addFlag).toHaveBeenCalledWith(dto);
        });

        it('should log error if questionsService.addFlag throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            const dto: QuestionFlagDto = { idQuest: '1', idUser: '1', flagType: 'Spam' };
            jest.spyOn(service, 'addFlag').mockImplementation(() => { throw new Error('Test Error') });
            try {
                await controller.addFlag(dto);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
            consoleSpy.mockRestore();
        });
    });

    describe('removeFlag', () => {
        it('should call questionsService.removeFlag with correct data', async () => {
            const dto: QuestionFlagDto = { idQuest: '1', idUser: '1', flagType: 'Spam' };
            await controller.removeFlag(dto);
            expect(service.removeFlag).toHaveBeenCalledWith(dto);
        });

        it('should log error if questionsService.removeFlag throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            const dto: QuestionFlagDto = { idQuest: '1', idUser: '1', flagType: 'Spam' };
            jest.spyOn(service, 'removeFlag').mockImplementation(() => { throw new Error('Test Error') });
            try {
                await controller.removeFlag(dto);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
            consoleSpy.mockRestore();
        });
    });

    describe('removeAllFlags', () => {
        it('should call questionsService.removeAllFlags with correct id', async () => {
            const id = '1';
            await controller.removeAllFlags(id);
            expect(service.removeAllFlags).toHaveBeenCalledWith(id);
        });

        it('should log error if questionsService.removeAllFlags throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            const id = '1';
            jest.spyOn(service, 'removeAllFlags').mockImplementation(() => { throw new Error('Test Error') });
            try {
                await controller.removeAllFlags(id);
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
