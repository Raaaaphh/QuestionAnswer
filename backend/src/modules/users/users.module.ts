import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';


@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [SequelizeModule, UsersService],
})
export class UsersModule { }
