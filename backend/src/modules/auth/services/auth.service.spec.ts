import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../../users/user.model';
import { JwtService } from '@nestjs/jwt';
import { InvitationsService } from '../../invitations/services/invitations.service';
import { AuthLoginDto } from '../dto';
import * as argon from 'argon2';
import { sendMail } from '../../../mailers/mail.utils';
import * as crypto from 'crypto';

jest.mock('argon2');
jest.mock('../../../mailers/mail.utils');
jest.mock('crypto');

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
        it('should return user and token on successful login', async () => {
            const authlog: AuthLoginDto = { name: 'test', password: 'password' };
            const user = { idUser: 'user-id', name: 'test', password: 'hashedPassword', role: 'user', banned: false };
            mockUserModel.findOne.mockResolvedValue(user);
            (argon.verify as jest.Mock).mockResolvedValue(true);
            mockJwtService.sign.mockReturnValue('jwt-token');

            const result = await service.login(authlog);

            expect(mockUserModel.findOne).toHaveBeenCalledWith({ where: { name: authlog.name } });
            expect(argon.verify).toHaveBeenCalledWith(user.password, authlog.password);
            expect(mockJwtService.sign).toHaveBeenCalledWith({ id: user.idUser, role: user.role });
            expect(result).toEqual({ user, token: 'jwt-token' });
        });
    });
});