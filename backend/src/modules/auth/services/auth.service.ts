import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as argon from 'argon2';
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from "@nestjs/jwt";
import { AuthLoginDto, AuthRegisterDto } from "../dto";
import { sendMail } from "../../../mailers/mail.utils";
import { User } from "../../users/user.model";
import { InvitationsService } from "../../invitations/services/invitations.service";
import * as jwt from 'jsonwebtoken';

@Injectable({})
export class AuthService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private invitationService: InvitationsService,
        private jwtService: JwtService
    ) { }

    test() {
        return 'Hello World ! depuis le Back';
    }

    async login(authlog: AuthLoginDto) {
        try {
            const user = await this.userModel.findOne({ where: { name: authlog.name } });

            if (!user) {
                throw new ForbiddenException('Username incorrect');
            }

            const valid = await argon.verify(user.password, authlog.password);
            if (!valid) {
                throw new ForbiddenException('Password incorrect');
            }

            if (!user.confirmed) {
                throw new ForbiddenException('User not confirmed');
            }

            if (user.banned) {
                throw new ForbiddenException('User is banned');
            }

            const payload = { id: user.idUser, role: user.role };
            const token = this.jwtService.sign(payload);

            return { user, token };
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            console.log(error);
            throw new InternalServerErrorException('An unexpected error occurred during login');
        }
    }

    async logout(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            if (!payload) {
                throw new ForbiddenException('Invalid token');
            }

            return { status: 'Success', message: 'User logged out successfully' };
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            throw new InternalServerErrorException('An unexpected error occurred during logout');
        }
    }

    async register(authreg: AuthRegisterDto) {
        try {
            const hash = await argon.hash(authreg.password);
            const idUser = uuidv4();

            const colors = ['FFB5B5', 'FFC8F0', 'FFD6A6', 'FEFFB4', 'C7FFF8', 'B7BEFF', 'ACACAC', 'C6FFCC'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            const crypto = require('crypto');
            const emailToken = crypto.randomBytes(64).toString("hex");

            const sameUser = await this.userModel.findOne({ where: { email: authreg.email } });
            if (sameUser) {
                throw new BadRequestException('Email already in use');
            }
            const newUser = await this.userModel.create({
                idUser,
                name: authreg.name,
                email: authreg.email,
                password: hash,
                color,
                emailToken,
            });

            sendMail(authreg.email, emailToken);
            return newUser;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('An unexpected error occurred during registration');
        }
    }

    async verifyEmail(emailToken: string): Promise<{ status: string, message: string }> {
        try {
            if (!emailToken) {
                throw new BadRequestException('Email token is missing');
            }

            const user = await this.userModel.findOne({ where: { emailToken } });
            if (!user) {
                throw new ForbiddenException('User not found');
            }

            user.confirmed = true;
            user.emailToken = null;
            await user.save();

            return { status: 'Success', message: 'User verified successfully' };
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof ForbiddenException) {
                throw error;
            }
            throw new InternalServerErrorException('An unexpected error occurred during email verification');
        }
    }

    async registerWithToken(token: string, invitationReg: AuthRegisterDto) {
        try {
            const hash = await argon.hash(invitationReg.password);
            const idUser = uuidv4();

            const colors = ['FFB5B5', 'FFC8F0', 'FFD6A6', 'FEFFB4', 'C7FFF8', 'B7BEFF', 'ACACAC', 'C6FFCC'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            const invitation = await this.invitationService.validateInvitation(token);
            const role = invitation.role;

            if (invitationReg.email !== invitation.email) {
                throw new ForbiddenException('Email does not match invitation');
            }

            const newUser = await this.userModel.create({
                idUser,
                name: invitationReg.name,
                email: invitationReg.email,
                password: hash,
                confirmed: true,
                color,
                role,
            });

            return newUser;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            throw new InternalServerErrorException('An unexpected error occurred during registration with token');
        }
    }
}
