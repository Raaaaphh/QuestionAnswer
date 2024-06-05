import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../../users/user.model';
import { JwtService } from '@nestjs/jwt';
import { InvitationsService } from '../../invitations/services/invitations.service';
import { AuthLoginDto, AuthRegisterDto } from '../dto';
import argon2 from 'argon2';
import { verify as argon2Verify } from 'argon2';
import { hash as argon2Hash } from 'argon2';
import { sendMail } from '../../../mailers/mail.utils';
import * as crypto from 'crypto';
import { ForbiddenException } from '@nestjs/common';

jest.mock('../../../mailers/mail.utils', () => ({
    sendMail: jest.fn(),
}));

// jest.mock('crypto', () => ({
//     randomBytes: jest.fn(() => Buffer.from('test_buffer')),
//     createHash: jest.fn().mockReturnValue({
//         update: jest.fn().mockReturnThis(),
//         digest: jest.fn().mockReturnValue('test_hash'),
//     }),
// }));

jest.mock('argon2', () => ({
    ...jest.requireActual('argon2'),
    verify: jest.fn().mockResolvedValue(false),
    hash: jest.fn().mockResolvedValue('hashed_password'),
}));

const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn()
};

const mockInvitationService = {
    validateInvitation: jest.fn(),
};

const mockJwtService = {
    sign: jest.fn(),
};

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: getModelToken(User), useValue: mockUserModel },
                { provide: InvitationsService, useValue: mockInvitationService },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should throw an error if user is not found', async () => {
            const authlog: AuthLoginDto = { name: 'test', password: 'password' };
            mockUserModel.findOne.mockResolvedValue(null);

            await expect(service.login(authlog)).rejects.toThrow(ForbiddenException);
        });

        it('should return user and token on successful login', async () => {
            const authlog: AuthLoginDto = { name: 'test', password: 'password' };
            const user = { idUser: 'user-id', name: 'test', password: 'hashedPassword', confirmed: true, role: 'user', banned: false };
            mockUserModel.findOne.mockResolvedValue(user);
            (argon2Verify as jest.Mock).mockResolvedValueOnce(true);
            mockJwtService.sign.mockReturnValue('jwt-token');

            const result = await service.login(authlog);

            expect(mockUserModel.findOne).toHaveBeenCalledWith({ where: { name: authlog.name } });
            expect(mockJwtService.sign).toHaveBeenCalledWith({ id: user.idUser, role: user.role });
            expect(result).toEqual({ user, token: 'jwt-token' });
        });

        it('should throw ForbiddenException if passwords do not match', async () => {
            const dto: AuthLoginDto = {
                name: 'test',
                password: 'password',
            };
            const user = { idUser: 'user-id', name: 'test', password: 'hashedPassword', confirmed: true, role: 'user', banned: false };

            (argon2Verify as jest.Mock).mockResolvedValueOnce(false);
            await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
        });

        it('should throw ForbiddenException if user is not confirmed', async () => {
            const dto: AuthLoginDto = {
                name: 'test',
                password: 'password',
            };
            const user = { idUser: 'user-id', name: 'test', password: 'hashedPassword', confirmed: false, role: 'user', banned: false };
            mockUserModel.findOne.mockResolvedValue(user);

            await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
        });

        it('should throw ForbiddenException if user is banned', async () => {
            const dto: AuthLoginDto = {
                name: 'test',
                password: 'password',
            };
            const user = { idUser: 'user-id', name: 'test', password: 'hashedPassword', confirmed: true, role: 'user', banned: true };
            mockUserModel.findOne.mockResolvedValue(user);

            await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
        });
    });

    // describe('register', () => {
    //     it('should create a new user', async () => {
    //         const authreg = {
    //             name: 'test',
    //             password: 'password',
    //             invitation: 'invitation-token',
    //         };
    //         const invitation = { email: 'test@utp.edu.my' };
    //         const user = { idUser: 'user-id', name: 'test', password: 'hashed_password', confirmed: false, role: 'user', banned: false };
    //         mockInvitationService.validateInvitation.mockResolvedValue(invitation);
    //         mockUserModel.create.mockReturnValue(user);
    //     });

    //     it('should throw an error if invitation is invalid', async () => {
    //         const authreg: AuthRegisterDto = {
    //             name: 'test',
    //             password: 'password',
    //             email: 'invalid@utp.edu.my',
    //         };
    //         mockInvitationService.validateInvitation.mockResolvedValue(null);

    //         await expect(service.register(authreg)).rejects.toThrow(ForbiddenException);
    //     });
    // });
});