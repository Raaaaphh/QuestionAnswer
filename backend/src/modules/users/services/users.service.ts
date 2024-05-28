import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user.model';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { UserEditMdpDto, UserEditNameDto } from '../dto';
import * as argon from 'argon2';
import { Op } from "sequelize";


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
            throw new BadRequestException('Invalid user ID');
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

    async findByName(name: string) {
        try {
            const users = await this.userModel.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                }
            });

            if (users.length === 0) {
                throw new NotFoundException(`User with name ${name} not found`);
            }

            return users;
        } catch (error) {
            console.log(error);
            throw new NotFoundException(`User with name ${name} not found`);
        }

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

    async ban(id: string) {
        const user = await this.userModel.findOne({
            where: {
                idUser: id
            }
        });

        if (!user) {
            throw new ForbiddenException('User not found');
        }

        user.banned = !user.banned;

        await user.save();
        return user;
    }

}