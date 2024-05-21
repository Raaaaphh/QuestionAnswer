import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { MailerService } from 'src/mailers/mailer.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UsersModule,
        JwtModule.register({
            secret: 'questionanswer',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, MailerService]
})
export class AuthModule { }
