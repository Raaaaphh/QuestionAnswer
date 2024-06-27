import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { UserEditMdpDto, UserEditNameDto } from '../dto';


describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    const mockUsersService = {
        findAll: jest.fn(),
        findByEmail: jest.fn(),
        findById: jest.fn(),
        remove: jest.fn(),
        editMdp: jest.fn(),
        editName: jest.fn(),
    };


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: mockUsersService },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('should call usersService.findAll', async () => {
            await controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findByName', () => {
        it('should call usersService.findByName with correct name', async () => {
            const email = 'test@utp';
            await controller.findByEmail(email);
            expect(service.findByEmail).toHaveBeenCalledWith(email);
        });
    });

    describe('findById', () => {
        it('should call usersService.findOne with correct id', async () => {
            const id = '1';
            await controller.findOne(id);
            expect(service.findById).toHaveBeenCalledWith(id);
        });
    });

    describe('remove', () => {
        it('should call usersService.remove with correct id', async () => {
            const id = '1';
            await controller.remove(id);
            expect(service.remove).toHaveBeenCalledWith(id);
        });
    });

    describe('editMdp', () => {
        it('should call usersService.editMdp with correct mdpDto', async () => {
            const mdpDto: UserEditMdpDto = { idUser: '1', oldpassword: 'mdp', newpassword: 'mdpp', confirmpassword: 'mdpp' };
            await controller.editMdp(mdpDto);
            expect(service.editMdp).toHaveBeenCalledWith(mdpDto);
        });
    });

    describe('editName', () => {
        it('should call usersService.editName with correct nameDto', async () => {
            const nameDto: UserEditNameDto = { idUser: '1', name: 'name' };
            await controller.editName(nameDto);
            expect(service.editName).toHaveBeenCalledWith(nameDto);
        });
    });

});