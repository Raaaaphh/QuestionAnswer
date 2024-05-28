import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';
import { Answer } from '../answer.model';
import { Picture } from '../../pictures/picture.model';
import { Sequelize } from 'sequelize-typescript';
import { getModelToken } from '@nestjs/sequelize';
import { BadRequestException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';

const mockAnswerModel = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn()
};

const mockPictureModel = {
    bulkCreate: jest.fn()
};

const mockTransaction = {
    commit: jest.fn(),
    rollback: jest.fn()
};

const mockSequelize = {
    transaction: jest.fn().mockReturnValue(mockTransaction)
};

describe('AnswersService', () => {
    let service: AnswersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnswersService,
                { provide: getModelToken(Answer), useValue: mockAnswerModel },
                { provide: getModelToken(Picture), useValue: mockPictureModel },
                { provide: Sequelize, useValue: mockSequelize },
            ],
        }).compile();

        service = module.get<AnswersService>(AnswersService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAnswer', () => {
        it('should throw BadRequestException if the ID is not a valid UUID', async () => {
            await expect(service.getAnswer('invalid-uuid')).rejects.toThrow(BadRequestException);
        });

        it('should throw ForbiddenException if the answer is not found', async () => {
            mockAnswerModel.findOne.mockResolvedValue(null);
            await expect(service.getAnswer('b3d6a5d7-54d7-44fd-929d-7352f462e635')).rejects.toThrow(ForbiddenException);
        });

        it('should return the answer if found', async () => {
            const answer = { idAnsw: 'b3d6a5d7-54d7-44fd-929d-7352f462e635', content: 'sample answer' };
            mockAnswerModel.findOne.mockResolvedValue(answer);
            const result = await service.getAnswer('b3d6a5d7-54d7-44fd-929d-7352f462e635');
            expect(result).toEqual(answer);
        });
    });

    describe('findAll', () => {
        it('should return all answers', async () => {
            const answers = [{ idAnsw: '1', content: 'answer 1' }, { idAnsw: '2', content: 'answer 2' }];
            mockAnswerModel.findAll.mockResolvedValue(answers);
            const result = await service.findAll();
            expect(result).toEqual(answers);
        });
    });

    describe('searchAnswersByUser', () => {
        it('should throw ForbiddenException if no answers are found', async () => {
            mockAnswerModel.findAll.mockResolvedValue([]);
            await expect(service.searchAnswersByUser('user-id')).rejects.toThrow(ForbiddenException);
        });

        it('should return answers if found', async () => {
            const answers = [{ idAnsw: '1', idUser: 'user-id', content: 'answer 1' }];
            mockAnswerModel.findAll.mockResolvedValue(answers);
            const result = await service.searchAnswersByUser('user-id');
            expect(result).toEqual(answers);
        });
    });

    describe('searchAnswersByQuestion', () => {
        it('should throw ForbiddenException if no answers are found', async () => {
            mockAnswerModel.findAll.mockResolvedValue([]);
            await expect(service.searchAnswersByQuestion('question-id')).rejects.toThrow(ForbiddenException);
        });

        it('should return answers if found', async () => {
            const answers = [{ idAnsw: '1', idQuest: 'question-id', content: 'answer 1' }];
            mockAnswerModel.findAll.mockResolvedValue(answers);
            const result = await service.searchAnswersByQuestion('question-id');
            expect(result).toEqual(answers);
        });
    });

    describe('createAnswer', () => {
        it('should create a new answer and return it', async () => {
            const answDto = { idUser: 'user-id', idQuest: 'question-id', content: 'new answer', listPictures: ['url1', 'url2'] };
            const createdAnswer = { idAnsw: 'generated-uuid', ...answDto };
            mockAnswerModel.create.mockResolvedValue(createdAnswer);

            const result = await service.createAnswer(answDto);

            expect(mockSequelize.transaction).toHaveBeenCalled();
            expect(mockAnswerModel.create).toHaveBeenCalledWith(
                expect.objectContaining({ idUser: answDto.idUser, idQuest: answDto.idQuest, content: answDto.content }),
                expect.any(Object)
            );
            expect(mockPictureModel.bulkCreate).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ url: 'url1' }),
                    expect.objectContaining({ url: 'url2' })
                ]),
                expect.any(Object)
            );
            expect(result).toEqual(createdAnswer);
        });

        it('should throw an HttpException if there is an error during creation', async () => {
            const answDto = { idUser: 'user-id', idQuest: 'question-id', content: 'new answer', listPictures: ['url1', 'url2'] };
            mockAnswerModel.create.mockRejectedValue(new Error('Creation error'));

            await expect(service.createAnswer(answDto)).rejects.toThrow(HttpException);
            expect(mockTransaction.rollback).toHaveBeenCalled(); // Correction ici
        });
    });

    describe('deleteAnswer', () => {
        it('should throw ForbiddenException if the answer is not found', async () => {
            mockAnswerModel.findOne.mockResolvedValue(null);
            await expect(service.deleteAnswer('answer-id')).rejects.toThrow(ForbiddenException);
        });

        it('should delete the answer and return it', async () => {
            const answer = { idAnsw: 'answer-id', content: 'answer to be deleted', destroy: jest.fn() };
            mockAnswerModel.findOne.mockResolvedValue(answer);

            const result = await service.deleteAnswer('answer-id');
            expect(mockAnswerModel.findOne).toHaveBeenCalledWith({ where: { idAnsw: 'answer-id' } });
            expect(answer.destroy).toHaveBeenCalled();
            expect(result).toEqual(answer);
        });
    });
});
