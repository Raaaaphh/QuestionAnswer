"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../user.model");
const uuid_1 = require("uuid");
const argon = require("argon2");
const sequelize_2 = require("sequelize");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        try {
            return await this.userModel.findAll();
        }
        catch (error) {
            console.log(error);
        }
    }
    async findById(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new common_1.BadRequestException('Invalid user ID');
        }
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByName(name) {
        try {
            const users = await this.userModel.findAll({
                where: {
                    name: {
                        [sequelize_2.Op.like]: `%${name.toLowerCase()}%`
                    }
                }
            });
            if (users.length === 0) {
                throw new common_1.NotFoundException(`User with name ${name} not found`);
            }
            return users;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException(`User with name ${name} not found`);
        }
    }
    async remove(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new common_1.BadRequestException('Invalid user ID');
        }
        const user = await this.userModel.findOne({
            where: {
                idUser: id
            }
        });
        if (!user) {
            throw new common_1.ForbiddenException('User not found');
        }
        await user.destroy();
        return user;
    }
    async editMdp(mdpDto) {
        const user = await this.userModel.findOne({
            where: {
                idUser: mdpDto.idUser
            }
        });
        if (!user) {
            throw new common_1.ForbiddenException('User not found');
        }
        const valid = await argon.verify(user.password, mdpDto.oldpassword);
        if (!valid) {
            throw new common_1.ForbiddenException('Invalid password');
        }
        if (mdpDto.newpassword !== mdpDto.confirmpassword) {
            throw new common_1.ForbiddenException('Passwords do not match');
        }
        const hash = await argon.hash(mdpDto.newpassword);
        user.password = hash;
        await user.save();
        return user;
    }
    async editName(userDto) {
        const user = await this.userModel.findOne({
            where: {
                idUser: userDto.idUser
            }
        });
        if (!user) {
            throw new common_1.ForbiddenException('User not found');
        }
        user.name = userDto.name;
        await user.save();
        return user;
    }
    async ban(id) {
        try {
            if (!(0, uuid_1.validate)(id)) {
                throw new common_1.BadRequestException('Invalid user ID');
            }
            const user = await this.userModel.findOne({
                where: {
                    idUser: id
                }
            });
            if (!user) {
                throw new common_1.ForbiddenException('User not found');
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map