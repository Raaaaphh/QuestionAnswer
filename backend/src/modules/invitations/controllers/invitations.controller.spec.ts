import { Test, TestingModule } from '@nestjs/testing';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from '../services/invitations.service';
import { ExecutionContext } from '@nestjs/common';
import { AdminGuard } from '../../../guards/admin.guard';

describe('InvitationsController', () => {
    let controller: InvitationsController;
    let service: InvitationsService;

    const mockInvitationsService = {
        sendInvitation: jest.fn(),
        validateInvitation: jest.fn(),
    };

    const mockAdminGuard = {
        canActivate: (context: ExecutionContext) => true,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [InvitationsController],
            providers: [
                { provide: InvitationsService, useValue: mockInvitationsService },
            ],
        }).overrideGuard(AdminGuard).useValue(mockAdminGuard).compile();

        controller = module.get<InvitationsController>(InvitationsController);
        service = module.get<InvitationsService>(InvitationsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('sendInvitation', () => {
        it('should call invitationsService.sendInvitation with correct data', async () => {
            const email = 'test@utp.edu.my';
            const role = 'Lecturer';
            await controller.sendInvitation(email, role);
            expect(service.sendInvitation).toHaveBeenCalledWith(email, role);
        });

        it('should log error if invitationsService.sendInvitation throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const email = 'test@utp.edu.my';
            const role = 'Lecturer';
            jest.spyOn(service, 'sendInvitation').mockImplementation(() => {
                throw new Error('Test Error');
            });

            try {
                await controller.sendInvitation(email, role);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
        });
    });

    describe('validateInvitation', () => {
        it('should call invitationsService.validateInvitation with correct token', async () => {
            const token = 'valid_token';
            await controller.validateInvitation(token);
            expect(service.validateInvitation).toHaveBeenCalledWith(token);
        });

        it('should log error if invitationsService.validateInvitation throws', async () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const token = 'valid_token';
            jest.spyOn(service, 'validateInvitation').mockImplementation(() => {
                throw new Error('Test Error');
            });

            try {
                await controller.validateInvitation(token);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
        });
    });
});
