import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { MailerService } from 'src/Mailers/mailer.service';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService, MailerService]
})
export class AuthModule { }
