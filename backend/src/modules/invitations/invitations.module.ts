import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invitation } from './invitation.model';
import { InvitationsController } from './controllers/invitations.controller';
import { InvitationsService } from './services/invitations.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        SequelizeModule.forFeature([Invitation]),
        JwtModule.register({
            secret: 'questionanswer',
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [InvitationsService],
    controllers: [InvitationsController],
})
export class InvitationsModule { }
