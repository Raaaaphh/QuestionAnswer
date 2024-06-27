import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../user.model';
import { getModelToken } from '@nestjs/sequelize';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { UserEditMdpDto, UserEditNameDto } from '../dto';
import argon2 from 'argon2';
import { verify as argon2Verify } from 'argon2';
import { hash as argon2Hash } from 'argon2';


jest.mock('uuid', () => ({
    ...jest.requireActual('uuid'),
    validate: jest.fn(),
}));

jest.mock('argon2', () => ({
    ...jest.requireActual('argon2'),
    verify: jest.fn().mockResolvedValue(false),
    hash: jest.fn().mockResolvedValue('hashed_password'),
}));

const mockUserModel = {
    findOne: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    save: jest.fn(),
};

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: getModelToken(User), useValue: mockUserModel },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            const users = [{ idUser: '1', name: 'name 1' }, { idUser: '2', name: 'name 2' }];
            mockUserModel.findAll.mockResolvedValue(users);

            const result = await service.findAll();
            expect(result).toEqual(users);
        });
    });

    describe('findById', () => {
        it('should throw NotFoundException if user is not found', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockUserModel.findByPk.mockResolvedValue(null);

            await expect(service.findById('b3d6a5d7-54d7-44fd-929d-7352f462e635')).rejects.toThrow(NotFoundException);
        });

        it('should return the question if found', async () => {
            const user = { idUser: 'b3d6a5d7-54d7-44fd-929d-7352f462e635' };
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockUserModel.findByPk.mockResolvedValue(user);

            const result = await service.findById('b3d6a5d7-54d7-44fd-929d-7352f462e635');
            expect(result).toEqual(user);
        });

        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.findById('invalid-id')).rejects.toThrow(BadRequestException);
        });
    });

    describe('findByEmail', () => {
        it('should throw NotFoundException if user is not found', async () => {
            mockUserModel.findAll.mockResolvedValue([]);

            await expect(service.findByEmail('test@utp')).rejects.toThrow(NotFoundException);
        });

        it('should return users found by their name', async () => {
            const users = [{ idUser: 'b3d6a5d7-54d7-44fd-929d-7352f462e635' }, { idUser: 'b3d6a5d7-54d7-44fd-929d-7352f462e636' }];
            mockUserModel.findAll.mockResolvedValue(users);

            const result = await service.findByEmail('test@utp');
            expect(result).toEqual(users);
        });
    });

    describe('remove', () => {
        it('should throw NotFoundException if user is not found', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockUserModel.findOne.mockResolvedValue(null);

            await expect(service.remove('user-id')).rejects.toThrow(NotFoundException);
        });

        it('should remove the user', async () => {
            const user = { idUser: 'user-id', destroy: jest.fn() };
            (isValidUUID as jest.Mock).mockReturnValue(true);
            mockUserModel.findOne.mockResolvedValue(user);

            const result = await service.remove('user-id');
            expect(user.destroy).toHaveBeenCalled();
            expect(result).toEqual(user);
        });

        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.remove('invalid-id')).rejects.toThrow(BadRequestException);
        });
    });

    describe('editMdp', () => {
        it('should throw NotFoundException if user is not found', async () => {
            const dto: UserEditMdpDto = {
                idUser: 'b3d6a5d7-54d7-44fd-929d-7352f462e635',
                oldpassword: 'oldpassword',
                newpassword: 'newpassword',
                confirmpassword: 'newpassword'
            };
            mockUserModel.findOne.mockResolvedValue(null);

            await expect(service.editMdp(dto)).rejects.toThrow(NotFoundException);
        });

        it('should trhow ForbiddenException if it is the wrong password', async () => {
            const dto: UserEditMdpDto = {
                idUser: 'b3d6a5d7-54d7-44fd-929d-7352f462e635',
                oldpassword: 'oldpassword',
                newpassword: 'newpassword',
                confirmpassword: 'newpassword'
            };
            mockUserModel.findOne.mockResolvedValue({
                idUser: 'b3d6a5d7-54d7-44fd-929d-7352f462e635',
                password: 'hashed_password',
            });

            (argon2Verify as jest.Mock).mockResolvedValueOnce(false);
            await expect(service.editMdp(dto)).rejects.toThrow(ForbiddenException);
        });

        it('should throw ForbiddenException if passwords do not match', async () => {
            const dto: UserEditMdpDto = {
                idUser: 'b3d6a5d7-54d7-44fd-929d-7352f462e635',
                oldpassword: 'password',
                newpassword: 'newpassword',
                confirmpassword: 'confirmpassword'
            };
            mockUserModel.findOne.mockResolvedValue({
                idUser: 'b3d6a5d7-54d7-44fd-929d-7352f462e635',
                password: 'hashed_password',
            });

            (argon2Verify as jest.Mock).mockResolvedValueOnce(true);
            await expect(service.editMdp(dto)).rejects.toThrow(ForbiddenException);
        });


        it('should update the user password', async () => {
            const dto: UserEditMdpDto = {
                idUser: '1',
                oldpassword: 'old_password',
                newpassword: 'new_password',
                confirmpassword: 'new_password',
            };
            const user = {
                idUser: '1',
                password: 'hashed_old_password',
                save: jest.fn(),
            };
            mockUserModel.findOne.mockResolvedValue(user);
            (argon2Verify as jest.Mock).mockResolvedValueOnce(true);
            (argon2Hash as jest.Mock).mockResolvedValueOnce('hashed_new_password');

            const result = await service.editMdp(dto);

            expect(mockUserModel.findOne).toHaveBeenCalledWith({
                where: {
                    idUser: dto.idUser,
                },
            });

            expect(user.password).toEqual('hashed_new_password');
            expect(user.save).toHaveBeenCalled();
            expect(result).toEqual(user);
        });
    });

    describe('editName', () => {
        it('should throw NotFoundException if user is not found', async () => {
            const dto: UserEditNameDto = { idUser: '1', name: 'new_name' };
            mockUserModel.findOne.mockResolvedValue(null);
            await expect(service.editName(dto)).rejects.toThrow(NotFoundException);
        });

        it('should edit the name', async () => {
            const dto: UserEditNameDto = { idUser: '1', name: 'new_name' };
            const user = { idUser: '1', name: 'old_name', save: jest.fn() };
            mockUserModel.findOne.mockResolvedValue(user);

            const result = await service.editName(dto);
            expect(user.name).toEqual(dto.name);
            expect(user.save).toHaveBeenCalled();
            expect(result).toEqual(user);
        });
    });

    describe('ban', () => {
        it('should throw BadRequestException if id is invalid', async () => {
            (isValidUUID as jest.Mock).mockReturnValue(false);

            await expect(service.remove('invalid-id')).rejects.toThrow(BadRequestException);
        });

        it('should ban the user', async () => {
            const userId = uuidv4();
            (isValidUUID as jest.Mock).mockReturnValue(true);
            const user = {
                idUser: userId,
                banned: false,
                save: jest.fn(),
            };
            mockUserModel.findOne.mockResolvedValue(user);

            const result = await service.ban(userId);

            expect(mockUserModel.findOne).toHaveBeenCalledWith({
                where: {
                    idUser: userId,
                },
            });
            expect(user.banned).toEqual(true);
            expect(user.save).toHaveBeenCalled();
            expect(result).toEqual(user);
        });

        it('should throw NotFoundException if user is not found', async () => {
            mockUserModel.findOne.mockResolvedValue(null);
            await expect(service.ban('user-id')).rejects.toThrow(NotFoundException);
        });
    });
});