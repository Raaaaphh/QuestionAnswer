import { Test, TestingModule } from '@nestjs/testing';
import { InvitationsService } from './invitations.service';
import { Invitation } from '../invitation.model';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { getModelToken } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';

describe('InvitationsService', () => {
    let service: InvitationsService;
    let jwtService: JwtService;
    const mockInvitation = new Invitation();
    const mockJwtService = {
        sign: jest.fn().mockReturnValue('fake_token'),
        verify: jest.fn().mockReturnValue({ email: 'test@example.com', role: 'admin' }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InvitationsService,
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: getModelToken(Invitation),
                    useValue: mockInvitation,
                },
            ],
            imports: [SequelizeModule.forRoot({ dialect: 'postgres' })],
        }).compile();

        service = module.get<InvitationsService>(InvitationsService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('sendInvitation', () => {
        it('should create a new invitation and return it', async () => {
            mockInvitation.save = jest.fn().mockResolvedValue(mockInvitation);
            const result = await service.sendInvitation('test@example.com', 'admin');

            expect(result).toEqual(mockInvitation);
            expect(mockInvitation.save).toHaveBeenCalledTimes(1);
            expect(jwtService.sign).toHaveBeenCalledWith(
                { email: 'test@example.com', role: 'admin' },
                { expiresIn: '7d' },
            );
        });
    });

    describe('validateInvitation', () => {
        it('should return the decoded token when the token is valid', async () => {
            const result = await service.validateInvitation('fake_token');

            expect(result).toEqual({ email: 'test@example.com', role: 'admin' });
            expect(jwtService.verify).toHaveBeenCalledWith('fake_token');
        });

        it('should throw a NotFoundException when the token is invalid or expired', async () => {
            mockJwtService.verify.mockRejectedValueOnce(new Error());

            await expect(service.validateInvitation('invalid_token')).rejects.toThrow(
                NotFoundException,
            );
            expect(jwtService.verify).toHaveBeenCalledWith('invalid_token');
        });
    });
});
