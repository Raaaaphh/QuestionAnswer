import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ForbiddenException, HttpException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Sequelize, Transaction } from 'sequelize';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { Op } from 'sequelize';
import { Question } from '../question.model';
import { QuestionTag } from '../../questiontags/questiontag.model';
import { Picture } from '../../pictures/picture.model';
import { Vote } from '../../votes/vote.model';
import { QuestionsService } from './questions.service';
import { QuestionCreateDto, QuestionEditDto, QuestionVoteDto } from '../dto';

jest.mock('uuid', () => ({
    ...jest.requireActual('uuid'),
    validate: jest.fn(),
}));

const mockQuestionModel = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
};

const mockQuestionTagModel = {
    bulkCreate: jest.fn(),
    destroy: jest.fn(),
};

const mockPictureModel = {
    bulkCreate: jest.fn(),
};

const mockVoteModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
};

const mockSequelize = {
    transaction: jest.fn(),
};

describe('QuestionsService', () => {
    let service: QuestionsService;
    let transaction: Transaction;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuestionsService,
                { provide: getModelToken(Question), useValue: mockQuestionModel },
                { provide: getModelToken(QuestionTag), useValue: mockQuestionTagModel },
                { provide: getModelToken(Picture), useValue: mockPictureModel },
                { provide: getModelToken(Vote), useValue: mockVoteModel },
                { provide: Sequelize, useValue: mockSequelize },
            ],
        }).compile();

        service = module.get<QuestionsService>(QuestionsService);

        transaction = {
            commit: jest.fn(),
            rollback: jest.fn(),
        } as unknown as Transaction;

        mockSequelize.transaction.mockImplementation(() => Promise.resolve(transaction));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getQuestion', () => {
        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.getQuestion('invalid-id')).rejects.toThrow(BadRequestException);
        });

        it('should throw ForbiddenException if question is not found', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockQuestionModel.findOne.mockResolvedValue(null);

            await expect(service.getQuestion('valid-id')).rejects.toThrow(ForbiddenException);
        });

        it('should return the question if found', async () => {
            const question = { idQuest: 'valid-id' };
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockQuestionModel.findOne.mockResolvedValue(question);

            const result = await service.getQuestion('valid-id');
            expect(result).toEqual(question);
        });
    });

    describe('findAll', () => {
        it('should return all questions', async () => {
            const questions = [{ idQuest: '1' }, { idQuest: '2' }];
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.findAll();
            expect(result).toEqual(questions);
        });
    });

    describe('findAllWithLimit', () => {
        it('should throw ForbiddenException if no questions are found', async () => {
            mockQuestionModel.findAll.mockResolvedValue([]);

            await expect(service.findAllWithLimit('10')).rejects.toThrow(ForbiddenException);
        });

        it('should return limited questions', async () => {
            const questions = [{ idQuest: '1' }, { idQuest: '2' }];
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.findAllWithLimit('10');
            expect(result).toEqual(questions);
        });
    });

    describe('searchQuestions', () => {
        it('should throw ForbiddenException if no questions are found', async () => {
            mockQuestionModel.findAll.mockResolvedValue([]);

            await expect(service.searchQuestions('search', '10')).rejects.toThrow(ForbiddenException);
        });

        it('should return the searched questions', async () => {
            const questions = [{ idQuest: '1' }, { idQuest: '2' }];
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.searchQuestions('search', '10');
            expect(result).toEqual(questions);
        });
    });

    describe('searchQuestionsByFilter', () => {
        it('should throw ForbiddenException if no questions are found', async () => {
            mockQuestionModel.findAll.mockResolvedValue([]);

            await expect(service.searchQuestionsByFilter('filter', '10', 'ASC')).rejects.toThrow(ForbiddenException);
        });

        it('should return the filtered questions', async () => {
            const questions = [{ idQuest: '1' }, { idQuest: '2' }];
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.searchQuestionsByFilter('filter', '10', 'ASC');
            expect(result).toEqual(questions);
        });
    });

    describe('searchQuestionsByUser', () => {
        it('should throw ForbiddenException if no questions are found', async () => {
            mockQuestionModel.findAll.mockResolvedValue([]);

            await expect(service.searchQuestionsByUser('user-id')).rejects.toThrow(ForbiddenException);
        });

        it('should return the questions of the user', async () => {
            const questions = [{ idQuest: '1' }, { idQuest: '2' }];
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.searchQuestionsByUser('user-id');
            expect(result).toEqual(questions);
        });
    });

    describe('searchQuestionsByTags', () => {
        it('should throw HttpException if no questions are found for the given tags', async () => {
            mockQuestionModel.findAll.mockResolvedValue([]);

            await expect(service.searchQuestionsByTags(['tag1', 'tag2'])).rejects.toThrow(HttpException);
        });

        it('should return the questions for the given tags', async () => {
            const questions = [{ idQuest: '1' }, { idQuest: '2' }];
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.searchQuestionsByTags(['tag1', 'tag2']);
            expect(result).toEqual(questions);
        });
    });

    describe('createQuestion', () => {
        it('should throw HttpException if the title is too long', async () => {
            const quest: QuestionCreateDto = {
                idUser: 'user-id',
                title: 'a'.repeat(101),
                description: 'description',
                context: 'context',
                listTags: [],
                listPictures: [],
            };

            await expect(service.createQuestion(quest)).rejects.toThrow(HttpException);
        });

        it('should create a new question', async () => {
            const quest: QuestionCreateDto = {
                idUser: 'user-id',
                title: 'title',
                description: 'description',
                context: 'context',
                listTags: [],
                listPictures: [],
            };

            mockQuestionModel.create.mockResolvedValue(quest);

            const result = await service.createQuestion(quest);
            expect(result).toEqual(quest);
            expect(transaction.commit).toHaveBeenCalled();
        });

        it('should rollback transaction on error', async () => {
            const quest: QuestionCreateDto = {
                idUser: 'user-id',
                title: 'title',
                description: 'description',
                context: 'context',
                listTags: [],
                listPictures: [],
            };

            mockQuestionModel.create.mockRejectedValue(new Error('Error'));

            await expect(service.createQuestion(quest)).rejects.toThrow(HttpException);
            expect(transaction.rollback).toHaveBeenCalled();
        });
    });

    describe('addVote', () => {
        it('should throw HttpException if user has already voted', async () => {
            const dto: QuestionVoteDto = { idUser: 'user-id', idQuest: 'question-id' };

            mockVoteModel.findOne.mockResolvedValue({});

            await expect(service.addVote(dto)).rejects.toThrow(HttpException);
        });

        it('should add a vote to the question', async () => {
            const dto: QuestionVoteDto = { idUser: 'user-id', idQuest: 'question-id' };

            mockVoteModel.findOne.mockResolvedValue(null);
            mockVoteModel.create.mockResolvedValue({});
            mockQuestionModel.findOne.mockResolvedValue({ idQuest: 'question-id', votes: 1, save: jest.fn() });

            const result = await service.addVote(dto);
            expect(result.votes).toBe(2);
            expect(transaction.commit).toHaveBeenCalled();
        });

        it('should rollback transaction on error', async () => {
            const dto: QuestionVoteDto = { idUser: 'user-id', idQuest: 'question-id' };

            mockVoteModel.findOne.mockRejectedValue(new Error('Error'));

            await expect(service.addVote(dto)).rejects.toThrow(HttpException);
            expect(transaction.rollback).toHaveBeenCalled();
        });
    });

    describe('removeVote', () => {
        it('should throw HttpException if vote is not found', async () => {
            const dto: QuestionVoteDto = { idUser: 'user-id', idQuest: 'question-id' };

            mockVoteModel.findOne.mockResolvedValue(null);

            await expect(service.removeVote(dto)).rejects.toThrow(HttpException);
        });

        it('should remove a vote from the question', async () => {
            const dto: QuestionVoteDto = { idUser: 'user-id', idQuest: 'question-id' };

            mockVoteModel.findOne.mockResolvedValue({ idVote: 'vote-id' });
            mockQuestionModel.findOne.mockResolvedValue({ idQuest: 'question-id', votes: 1, save: jest.fn() });

            const result = await service.removeVote(dto);
            expect(result.votes).toBe(0);
            expect(transaction.commit).toHaveBeenCalled();
        });

        it('should rollback transaction on error', async () => {
            const dto: QuestionVoteDto = { idUser: 'user-id', idQuest: 'question-id' };

            mockVoteModel.findOne.mockRejectedValue(new Error('Error'));

            await expect(service.removeVote(dto)).rejects.toThrow(HttpException);
            expect(transaction.rollback).toHaveBeenCalled();
        });
    });

    describe('editQuestion', () => {
        it('should throw ForbiddenException if question is not found', async () => {
            const question: QuestionEditDto = {
                idQuest: 'question-id',
                idUser: 'user-id',
                title: 'title',
                description: 'description',
                context: 'context',
                listTags: [],
            };

            mockQuestionModel.findOne.mockResolvedValue(null);

            await expect(service.editQuestion(question)).rejects.toThrow(ForbiddenException);
        });

        it('should edit the question', async () => {
            const question: QuestionEditDto = {
                idQuest: 'question-id',
                idUser: 'user-id',
                title: 'title',
                description: 'description',
                context: 'context',
                listTags: [],
            };

            const quest = { idQuest: 'question-id', save: jest.fn() };
            mockQuestionModel.findOne.mockResolvedValue(quest);

            const result = await service.editQuestion(question);
            expect(result).toEqual(quest);
            expect(transaction.commit).toHaveBeenCalled();
        });

        it('should rollback transaction on error', async () => {
            const question: QuestionEditDto = {
                idQuest: 'question-id',
                idUser: 'user-id',
                title: 'title',
                description: 'description',
                context: 'context',
                listTags: [],
            };

            mockQuestionModel.findOne.mockRejectedValue(new Error('Error'));

            await expect(service.editQuestion(question)).rejects.toThrow(HttpException);
            expect(transaction.rollback).toHaveBeenCalled();
        });
    });

    describe('deleteQuestion', () => {
        it('should throw ForbiddenException if question is not found', async () => {
            mockQuestionModel.findOne.mockResolvedValue(null);

            await expect(service.deleteQuestion('question-id')).rejects.toThrow(ForbiddenException);
        });

        it('should delete the question', async () => {
            const question = { idQuest: 'question-id', destroy: jest.fn() };
            mockQuestionModel.findOne.mockResolvedValue(question);

            const result = await service.deleteQuestion('question-id');
            expect(question.destroy).toHaveBeenCalled();
            expect(result).toEqual(question);
        });
    });
});
