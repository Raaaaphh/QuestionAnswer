import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserEditMdpDto, UserEditNameDto } from "../dto";
import { AdminGuard } from "../../../guards/admin.guard";

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

    @Get('findByEmail/:email')
    async findByName(@Param('email') email: string) {
        try {
            return await this.usersService.findByEmail(email);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.usersService.findById(id);
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

    @Post('changeRole/params?')
    @UseGuards(AdminGuard)
    async changeRole(@Query('idUser') idUser: string, @Query('role') role: string) {
        try {
            return await this.usersService.changeRole(idUser, role);
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

    @Post('ban/:id')
    @UseGuards(AdminGuard)
    async ban(@Param('id') id: string) {
        try {
            return await this.usersService.ban(id);
        }
        catch (error) {
            console.log(error);
        }
    }
}