import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthLoginDto, AuthRegisterDto } from '../dto';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    const mockAuthService = {
        login: jest.fn(),
        register: jest.fn(),
        verifyEmail: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should call authService.login with correct data', async () => {
            const dto: AuthLoginDto = { name: 'test', password: 'password' };
            await controller.login(dto);
            expect(service.login).toHaveBeenCalledWith(dto);
        });

        it('should log error if authService.login throws', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const authLoginDto: AuthLoginDto = { name: 'test', password: 'test' };
            jest.spyOn(service, 'login').mockImplementation(() => { throw new Error('Test Error') });
            try {
                controller.login(authLoginDto);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
        });
    });

    describe('register', () => {
        it('should call authService.register with correct data', async () => {
            const dto: AuthRegisterDto = { email: 'test@utp.edu.my', name: 'test', password: 'password' };
            await controller.register(dto);
            expect(service.register).toHaveBeenCalledWith(dto);
        });

        it('should log error if authService.register throws', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const authRegisterDto: AuthRegisterDto = { name: 'test', password: 'test', email: 'test@utp.edu.my' };
            jest.spyOn(service, 'register').mockImplementation(() => { throw new Error('Test Error') });
            try {
                controller.register(authRegisterDto);
            } catch (error) {
                expect(consoleSpy).toHaveBeenCalledWith(new Error('Test Error'));
            }
        });
    });

    describe('verifyEmail', () => {
        it('should call authService.verifyEmail with correct data', async () => {
            const emailToken = 'testToken';
            await controller.verifyEmail(emailToken);
            expect(service.verifyEmail).toHaveBeenCalledWith(emailToken);
        });

        it('should log error and throw if emailToken is missing', async () => {
            const consoleSpy = jest.spyOn(console, 'log');
            jest.spyOn(service, 'verifyEmail').mockImplementation(() => { throw new BadRequestException('Email token is missing') });

            await expect(controller.verifyEmail(null)).rejects.toThrow(BadRequestException);
            expect(consoleSpy).toHaveBeenCalledWith(new BadRequestException('Email token is missing'));
        });

        it('should log error and throw if user not found', async () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const emailToken = 'invalidToken';
            jest.spyOn(service, 'verifyEmail').mockImplementation(() => { throw new ForbiddenException('User not found') });

            await expect(controller.verifyEmail(emailToken)).rejects.toThrow(ForbiddenException);
            expect(consoleSpy).toHaveBeenCalledWith(new ForbiddenException('User not found'));
        });
    });

});