import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserEditMdpDto, UserEditNameDto } from "../dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async findAll() {
        try {
            return await this.usersService.findAll();
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('findByName/:name')
    async findByName(@Param('name') name: string) {
        try {
            return await this.usersService.findByName(name);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.usersService.findOne(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return await this.usersService.remove(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('edit/mdp')
    async editMdp(@Body() mdpDto: UserEditMdpDto) {
        try {
            return await this.usersService.editMdp(mdpDto);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('edit/name')
    async editName(@Body() nameDto: UserEditNameDto) {
        try {
            return await this.usersService.editName(nameDto);
        }
        catch (error) {
            console.log(error);
        }
    }
}