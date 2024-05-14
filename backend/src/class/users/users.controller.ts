import { Controller, Delete, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(id: string) {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    async remove(id: string) {
        return this.usersService.remove(id);
    }
}