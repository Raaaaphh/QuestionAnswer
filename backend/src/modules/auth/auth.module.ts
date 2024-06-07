import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { InvitationsModule } from '../invitations/invitations.module';

@Module({
    imports: [UsersModule,
        JwtModule.register({
            secret: 'questionanswer',
            signOptions: { expiresIn: '1d' },
        }),
        InvitationsModule,
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
