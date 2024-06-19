import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role, User } from '../user.model';
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
        try {
            return await this.userModel.findAll();
        }
        catch (error) {
            console.log(error);
            throw new NotFoundException('Users not found');
        }
    }

    async findById(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid user ID');
        }
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }


    async findByEmail(email: string) {
        try {
            const users = await this.userModel.findAll({
                where: {
                    email: {
                        [Op.like]: `${email}%`
                    }
                },
                limit: 5,
            });

            if (users.length === 0 || !users) {
                throw new NotFoundException(`User with name ${email} not found`);
            }

            return users;
        } catch (error) {
            console.log(error);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new HttpException('Error while finding user by email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid user ID');
        }
        const user = await this.userModel.findOne({
            where: {
                idUser: id
            }
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await user.destroy();
        return user;
    }

    async changeRole(id: string, role: string) {
        try {
            if (!isValidUUID(id)) {
                throw new BadRequestException('Invalid user ID');
            }
            const user = await this.userModel.findOne({
                where: {
                    idUser: id
                }
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            user.role = role as Role;

            await user.save();
            return user;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    async editMdp(mdpDto: UserEditMdpDto) {
        const user = await this.userModel.findOne({
            where: {
                idUser: mdpDto.idUser
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
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
            throw new NotFoundException('User not found');
        }

        user.name = userDto.name;

        await user.save();
        return user;
    }


    async ban(id: string) {
        try {
            if (!isValidUUID(id)) {
                throw new BadRequestException('Invalid user ID');
            }
            const user = await this.userModel.findOne({
                where: {
                    idUser: id
                },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            user.banned = !user.banned;

            await user.save();
            return user;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}