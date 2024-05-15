import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findOne(id: string): Promise<User> {

        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid question ID');
        }

        const user = await this.userModel.findOne({
            where: {
                idUser: id
            }
        });

        if (!user) {
            throw new ForbiddenException('User not found');
        }

        return user;

    }

    async remove(id: string): Promise<void> {
        //const user = await this.findOne(id);
        //await user.destroy();
        const user = await this.userModel.findOne({
            where: {
                idUser: id
            }
        });
        if (!user) {
            throw new ForbiddenException('Question not found');
        }

        await user.destroy();
    }


}