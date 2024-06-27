import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { getModelToken } from '@nestjs/sequelize';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { Tag } from '../tag.model';
import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { TagCreateDto } from '../dto/tag-create.dto';

jest.mock('uuid', () => ({
    ...jest.requireActual('uuid'),
    validate: jest.fn(),
}));

const mockTagModel = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
};


describe('TagsService', () => {
    let service: TagsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TagsService,
                { provide: getModelToken(Tag), useValue: mockTagModel },
            ],
        }).compile();

        service = module.get<TagsService>(TagsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getTag', () => {
        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.getTag('invalid-id')).rejects.toThrow(BadRequestException);
        });

        it('should throw NotFoundException if tag is not found', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockTagModel.findOne.mockResolvedValue(null);

            await expect(service.getTag('b3d6a5d7-54d7-44fd-929d-7352f462e635')).rejects.toThrow(NotFoundException);
        });

        it('should return the tag if found', async () => {
            const tag = { idTag: 'pb3d6a5d7-54d7-44fd-929d-7352f462e635' };
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockTagModel.findOne.mockResolvedValue(tag);

            const result = await service.getTag('b3d6a5d7-54d7-44fd-929d-7352f462e635');
            expect(result).toEqual(tag);
        });
    });

    describe('findAll', () => {
        it('should return all tags', async () => {
            const tags = [{ idTag: '1', name: 'name 1' }, { idTag: '2', name: 'name 2' }];
            mockTagModel.findAll.mockResolvedValue(tags);

            const result = await service.findAll();
            expect(result).toEqual(tags);
        });
    });

    describe('createTag', () => {
        it('should create a tag', async () => {
            const tag: TagCreateDto =
            {
                name: 'tag name',
                description: 'tag description',
                idUser: 'b3ddzdb7-54d7-44fd-929d-7352f462e635'
            };
            mockTagModel.create.mockResolvedValue(tag);
            mockTagModel.findOne.mockResolvedValue(null);

            const result = await service.createTag(tag);
            expect(result).toEqual(tag);
        });

        it('should throw HttpException if an error occurs', async () => {
            const tag: TagCreateDto =
            {
                name: 'tag name',
                description: 'tag description',
                idUser: 'b3ddzdb7-54d7-44fd-929d-7352f462e635'
            };
            mockTagModel.create.mockRejectedValue(new Error());

            await expect(service.createTag(tag)).rejects.toThrow(HttpException);
        });
    });

    describe('deleteQuestion', () => {
        it('should throw NotFoundException if tag is not found', async () => {
            mockTagModel.findOne.mockResolvedValue(null);

            await expect(service.deleteTag('tag-id')).rejects.toThrow(NotFoundException);
        });

        it('should delete the question', async () => {
            const tag = { idTag: 'tag-id', destroy: jest.fn() };
            mockTagModel.findOne.mockResolvedValue(tag);

            const result = await service.deleteTag('tag-id');
            expect(tag.destroy).toHaveBeenCalled();
            expect(result).toEqual(tag);
        });

        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.deleteTag('invalid-id')).rejects.toThrow(BadRequestException);
        });
    });

});