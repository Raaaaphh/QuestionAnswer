import { Test, TestingModule } from '@nestjs/testing';
import { InvitationsService } from './invitations.service';
import { Invitation } from '../invitation.model';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

describe('InvitationsService', () => {
    let service: InvitationsService;
    let invitationModel: typeof Invitation;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InvitationsService,
                {
                    provide: 'InvitationRepository',
                    useValue: Invitation,
                },
                JwtService,
            ],
        }).compile();

        service = module.get<InvitationsService>(InvitationsService);
        invitationModel = module.get<typeof Invitation>('InvitationRepository');
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('sendInvitation', () => {
        it('should create a new invitation and return it', async () => {
            const email = 'test@example.com';
            const role = 'admin';
            const mockInvitation = {
                idInvitation: uuidv4(),
                email,
                role,
                createdAt: '2021-01-01T00:00:00.000Z',
                updatedAt: '2021-01-01T00:00:00.000Z',
            };
            jest.spyOn(invitationModel, 'create').mockResolvedValue(mockInvitation);
            jest.spyOn(jwtService, 'sign').mockReturnValue('mock_token');
            const sendMailInvitation = jest.fn();
            service['sendMailInvitation'] = sendMailInvitation;

            const result = await service.sendInvitation(email, role);

            expect(result).toEqual(mockInvitation);
            expect(invitationModel.create).toHaveBeenCalledWith({ email, role: 'admin' });
            expect(jwtService.sign).toHaveBeenCalledWith({ email, role: 'admin' }, { expiresIn: '7d' });
            expect(sendMailInvitation).toHaveBeenCalledWith(email, `http://localhost:5173/register/invitation?token=mock_token`);
            delete service['sendMailInvitation'];
        });
    });

    describe('validateInvitation', () => {
        it('should return the email and role from a valid token', async () => {
            const email = 'test@example.com';
            const role = 'admin';
            const secret = 'my-secret-key';
            const token = jwt.sign({ email, role }, secret, { expiresIn: '1h' });

            jest.spyOn(jwtService, 'verify').mockReturnValue({ email, role });

            const options = { secret };

            const result = await service.validateInvitation(token);

            expect(result).toEqual({ email, role });
            expect(jwtService.verify).toHaveBeenCalledWith(token, options);
        });


        it('should throw a NotFoundException for an invalid token', async () => {
            const token = 'invalid_token';

            await expect(service.validateInvitation(token)).rejects.toThrow(NotFoundException);
            await expect(service.validateInvitation(token)).rejects.toHaveProperty('message', 'Invalid or expired token');
        });
    });
});
