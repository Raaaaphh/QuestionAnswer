import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ForbiddenException, HttpException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { Question } from '../question.model';
import { QuestionTag } from '../../questiontags/questiontag.model';
import { Picture } from '../../pictures/picture.model';
import { Vote } from '../../votes/vote.model';
import { QuestionsService } from './questions.service';
import { QuestionCreateDto, QuestionEditDto, QuestionVoteDto } from '../dto';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { Flag } from '../../flags/flag.model';
import { Tag } from '../../tags/tag.model';
import { User } from '../../users/user.model';
import { Favorite } from '../../favorites/favorite.model';

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
    findAll: jest.fn(),
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

const mockFlagModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
};

const mockTagModel = {
    findAll: jest.fn(),
    bulkCreate: jest.fn(),
    destroy: jest.fn(),
};

const mockUserModel = {
    findAll: jest.fn(),
};

const mockFavoriteModel = {
    findAll: jest.fn(),
};

const mockTransaction = {
    commit: jest.fn(),
    rollback: jest.fn()
};

const mockSequelize = {
    transaction: jest.fn().mockReturnValue(mockTransaction),
};


describe('QuestionsService', () => {
    let service: QuestionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuestionsService,
                { provide: getModelToken(Question), useValue: mockQuestionModel },
                { provide: getModelToken(QuestionTag), useValue: mockQuestionTagModel },
                { provide: getModelToken(Picture), useValue: mockPictureModel },
                { provide: getModelToken(Vote), useValue: mockVoteModel },
                { provide: getModelToken(Flag), useValue: mockFlagModel },
                { provide: getModelToken(Tag), useValue: mockTagModel },
                { provide: getModelToken(User), useValue: mockUserModel },
                { provide: getModelToken(Favorite), useValue: mockFavoriteModel },
                { provide: Sequelize, useValue: mockSequelize }
            ],
        }).compile();

        service = module.get<QuestionsService>(QuestionsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getQuestion', () => {
        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.getQuestion('invalid-id')).rejects.toThrow(BadRequestException);
        });

        it('should throw NotFoundException if question is not found', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockQuestionModel.findOne.mockResolvedValue(null);

            await expect(service.getQuestion('b3d6a5d7-54d7-44fd-929d-7352f462e635')).rejects.toThrow(NotFoundException);
        });

        it('should return the question if found', async () => {
            const question = { idQuest: 'b3d6a5d7-54d7-44fd-929d-7352f462e635' };
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockQuestionModel.findOne.mockResolvedValue(question);

            const result = await service.getQuestion('b3d6a5d7-54d7-44fd-929d-7352f462e635');
            expect(result).toEqual(question);
        });
    });

    describe('findAll', () => {
        it('should return all questions', async () => {
            const questions = [{ idQuest: '1', description: 'description 1' }, { idQuest: '2', description: 'description 2' }];
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.findAll();
            expect(result).toEqual(questions);
        });
    });

    describe('findAllWithLimit', () => {
        it('should throw NotFoundException if no questions are found', async () => {
            mockQuestionModel.findAll.mockResolvedValue([]);

            await expect(service.findAllWithLimit('10', '1')).rejects.toThrow(NotFoundException);
        });

        it('should return limited questions', async () => {
            const questions = [{ idQuest: '1' }, { idQuest: '2' }];
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.findAllWithLimit('10', '1');
            expect(result).toEqual(questions);
        });
    });

    describe('searchQuestions', () => {
        it('should throw NotFoundException if no questions are found', async () => {
            mockQuestionModel.findAll.mockResolvedValue([]);

            await expect(service.searchQuestions('search', '10', '1')).rejects.toThrow(NotFoundException);
        });

        it('should return the searched questions', async () => {
            const questions = [{ idQuest: '1' }, { idQuest: '2' }];
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.searchQuestions('search', '10', '1');
            expect(result).toEqual(questions);
        });
    });

    describe('searchQuestionsByFilter', () => {
        it('should throw NotFoundException if no questions are found', async () => {
            mockQuestionModel.findAll.mockResolvedValue([]);

            await expect(service.searchQuestionsByFilter('filter', '10', 'ASC')).rejects.toThrow(NotFoundException);
        });

        it('should return the filtered questions', async () => {
            const questions = [{ idQuest: '1' }, { idQuest: '2' }];
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.searchQuestionsByFilter('filter', '10', 'ASC');
            expect(result).toEqual(questions);
        });
    });

    describe('searchQuestionsByUser', () => {
        it('should throw NotFoundException if no questions are found', async () => {
            mockQuestionModel.findAll.mockResolvedValue([]);

            await expect(service.searchQuestionsByUser('user-name', '20', '1')).rejects.toThrow(NotFoundException);
        });

        it('should return the questions of the user', async () => {
            const questions = [{ idQuest: '1' }, { idQuest: '2' }];
            const user = { name: 'user-name' };
            mockUserModel.findAll.mockResolvedValue([user]);
            mockQuestionModel.findAll.mockResolvedValue(questions);

            const result = await service.searchQuestionsByUser('user-name', '20', '1');
            expect(result).toEqual(questions);
        });
    });

    describe('searchQuestionsByTags', () => {
        it('should throw NotFoundException if no questions are found for the given tags', async () => {
            mockQuestionModel.findAll.mockResolvedValue([]);

            await expect(service.searchQuestionsByTags(['tag1', 'tag2'], '20', '1')).rejects.toThrow(NotFoundException);
        });

        // it('should return the questions for the given tags', async () => {
        //     const tags = ['tag1', 'tag2'];
        //     const questions = [{ idQuest: '1', description: 'description 1', QuestionTags: [{ idTag: 'tag1' }, { idTag: 'tag2' }] }, { idQuest: '2', description: 'description 2', QuestionTags: [{ idTag: 'tag1' }, { idTag: 'tag2' }] }];
        //     mockQuestionModel.findAll.mockResolvedValue({
        //         rows: questions,
        //         count: questions.length
        //     });

        //     const result = await service.searchQuestionsByTags(tags);
        //     expect(result).toEqual(questions);
        //     expect(mockQuestionModel.findAll).toHaveBeenCalledWith({
        //         include: [{
        //             model: QuestionTag,
        //             where: {
        //                 idTag: {
        //                     [Op.in]: tags
        //                 }
        //             }
        //         }],
        //         group: ['Question.idQuest'],
        //         having: sequelize.literal(`COUNT(DISTINCT \`QuestionTags\`.\`idTag\`) = ${tags.length}`)
        //     });
        // });
    });


    describe('createQuestion', () => {
        it('should throw HttpException if the title is too long', async () => {
            const quest: QuestionCreateDto = {
                idUser: 'user-id',
                title: 'a'.repeat(101),
                description: 'description',
                context: 'context',
                listTags: ['tag1'],
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
                listTags: ['tag1'],
                listPictures: [],
            };
            const createdQuestion = { idQuest: 'generated-uuid', ...quest };

            mockQuestionModel.create.mockResolvedValue(createdQuestion);
            mockQuestionModel.findAll.mockResolvedValue([]);

            const result = await service.createQuestion(quest);

            expect(mockSequelize.transaction).toHaveBeenCalled();
            expect(mockQuestionModel.create).toHaveBeenCalledWith(
                expect.objectContaining({ idUser: quest.idUser, title: quest.title, description: quest.description, context: quest.context }),
                expect.any(Object)
            );
            expect(mockQuestionTagModel.bulkCreate).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ idTag: 'tag1' }),
                ]),
                expect.any(Object)
            );
            expect(result).toEqual(createdQuestion);
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
            expect(mockSequelize.transaction).toHaveBeenCalled();
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
            expect(mockSequelize.transaction).toHaveBeenCalled();
        });

        it('should rollback transaction on error', async () => {
            const dto: QuestionVoteDto = { idUser: 'user-id', idQuest: 'question-id' };

            mockVoteModel.findOne.mockRejectedValue(new Error('Error'));

            await expect(service.addVote(dto)).rejects.toThrow(HttpException);
            expect(mockSequelize.transaction).toHaveBeenCalled();
        });
    });

    describe('removeVote', () => {
        it('should throw NotFoundException if vote is not found', async () => {
            const dto: QuestionVoteDto = { idUser: 'user-id', idQuest: 'question-id' };

            mockVoteModel.findOne.mockResolvedValue(null);

            await expect(service.removeVote(dto)).rejects.toThrow(NotFoundException);
        });

        it('should remove a vote from the question', async () => {
            const dto: QuestionVoteDto = { idUser: 'user-id', idQuest: 'question-id' };

            mockVoteModel.findOne.mockResolvedValue({ idVote: 'vote-id' });
            mockQuestionModel.findOne.mockResolvedValue({ idQuest: 'question-id', votes: 1, save: jest.fn() });

            const result = await service.removeVote(dto);
            expect(result.votes).toBe(0);
            expect(mockSequelize.transaction).toHaveBeenCalled();
        });

        it('should rollback transaction on error', async () => {
            const dto: QuestionVoteDto = { idUser: 'user-id', idQuest: 'question-id' };

            mockVoteModel.findOne.mockRejectedValue(new Error('Error'));

            await expect(service.removeVote(dto)).rejects.toThrow(HttpException);
            expect(mockSequelize.transaction).toHaveBeenCalled();
        });
    });

    describe('editQuestion', () => {
        it('should throw NotFoundException if question is not found', async () => {
            const question: QuestionEditDto = {
                idQuest: 'question-id',
                idUser: 'user-id',
                title: 'title',
                description: 'description',
                context: 'context',
                listTags: [],
            };

            mockQuestionModel.findOne.mockResolvedValue(null);

            await expect(service.editQuestion(question)).rejects.toThrow(NotFoundException);
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
            expect(mockSequelize.transaction).toHaveBeenCalled();
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
            expect(mockSequelize.transaction).toHaveBeenCalled();
        });
    });

    describe('deleteQuestion', () => {
        it('should throw NotFoundException if question is not found', async () => {
            mockQuestionModel.findOne.mockResolvedValue(null);

            await expect(service.deleteQuestion('question-id')).rejects.toThrow(NotFoundException);
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
