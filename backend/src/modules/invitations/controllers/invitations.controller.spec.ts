import { Test, TestingModule } from '@nestjs/testing';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from '../services/invitations.service';
import { BadRequestException, ExecutionContext, NotFoundException } from '@nestjs/common';
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

        it('should throw BadRequestException if invitationsService.sendInvitation throws', async () => {
            const email = 'test@utp.edu.my';
            const role = 'Lecturer';
            jest.spyOn(service, 'sendInvitation').mockImplementation(() => {
                throw new BadRequestException('Test Error');
            });

            await expect(controller.sendInvitation(email, role)).rejects.toThrow(BadRequestException);
        });
    });

    describe('validateInvitation', () => {
        it('should call invitationsService.validateInvitation with correct token', async () => {
            const token = 'valid_token';
            await controller.validateInvitation(token);
            expect(service.validateInvitation).toHaveBeenCalledWith(token);
        });

        it('should throw NotFoundException if invitationsService.validateInvitation throws', async () => {
            const token = 'valid_token';
            jest.spyOn(service, 'validateInvitation').mockImplementation(() => {
                throw new NotFoundException('Test Error');
            });

            await expect(controller.validateInvitation(token)).rejects.toThrow(NotFoundException);
        });
    });
});
