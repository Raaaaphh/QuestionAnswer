import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { UserEditMdpDto, UserEditNameDto } from './dto';
import * as argon from 'argon2';


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

    async remove(id: string) {
        //const user = await this.findOne(id);
        //await user.destroy();
        const user = await this.userModel.findOne({
            where: {
                idUser: id
            }
        });
        if (!user) {
            throw new ForbiddenException('User not found');
        }
        await user.destroy();
        return user;
    }

    async editMdp(mdpDto: UserEditMdpDto) {
        const user = await this.userModel.findOne({
            where: {
                idUser: mdpDto.idUser
            }
        });

        if (!user) {
            throw new ForbiddenException('User not found');
        }

        const valid = await argon.verify(user.password, mdpDto.oldpassword);
        if (!valid) {
            throw new ForbiddenException('Invalid password');
        }

        if (mdpDto.newpassword !== mdpDto.confirmpassword) {
            throw new ForbiddenException('Passwords do not match');
        }

        const hash = await argon.hash(mdpDto.newpassword);
        user.password = hash;

        await user.save();
        return user;
    }

    async editName(userDto: UserEditNameDto) {
        const user = await this.userModel.findOne({
            where: {
                idUser: userDto.idUser
            }
        });

        if (!user) {
            throw new ForbiddenException('User not found');
        }

        user.name = userDto.name;

        await user.save();
        return user;
    }

    async findById(id: string): Promise<User | null> {
        return await this.userModel.findByPk(id);
    }

}