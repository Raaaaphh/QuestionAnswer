import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from '../services/tags.service';
import { ExecutionContext } from '@nestjs/common';
import { AdminGuard } from '../../../guards/admin.guard';
import { TagCreateDto } from '../dto/tag-create.dto';


describe('TagsController', () => {
    let controller: TagsController;
    let service: TagsService;

    const mockTagsService = {
        findAll: jest.fn(),
        getTag: jest.fn(),
        createTag: jest.fn(),
        deleteTag: jest.fn(),
    };

    const mockAdminGuard = {
        canActivate: (context: ExecutionContext) => {
            return true;
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TagsController],
            providers: [
                { provide: TagsService, useValue: mockTagsService },
            ],
        }).overrideGuard(AdminGuard).useValue(mockAdminGuard).compile();

        controller = module.get<TagsController>(TagsController);
        service = module.get<TagsService>(TagsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('should call tagsService.findAll', async () => {
            await controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('getTag', () => {
        it('should call tagsService.getTag with correct id', async () => {
            const id = '1';
            await controller.getTag(id);
            expect(service.getTag).toHaveBeenCalledWith(id);
        });
    });

    describe('createTag', () => {
        it('should call answerstagsService.createTag with correct data', async () => {
            const dto: TagCreateDto = { name: 'name', description: 'description', idUser: '1' };
            await controller.createTag(dto);
            expect(service.createTag).toHaveBeenCalledWith(dto);
        });
    });

    describe('deleteTag', () => {
        it('should call tagsService.deleteTag with correct id', async () => {
            const id = '1';
            await controller.deleteTag(id);
            expect(service.deleteTag).toHaveBeenCalledWith(id);
        });
    });
});