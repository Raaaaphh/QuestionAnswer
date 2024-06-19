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
            throw error;
        }
    }

    /**
     * Find a user by email
     * @param email 
     * @returns 
     */
    @Get('findByEmail/:email')
    async findByEmail(@Param('email') email: string) {
        try {
            return await this.usersService.findByEmail(email);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.usersService.findById(id);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return await this.usersService.remove(id);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Change the role of a user by hand
     * @param idUser 
     * @param role 
     * @returns 
     */
    @Post('changeRole/params?')
    @UseGuards(AdminGuard)
    async changeRole(@Query('idUser') idUser: string, @Query('role') role: string) {
        try {
            return await this.usersService.changeRole(idUser, role);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Post('edit/mdp')
    async editMdp(@Body() mdpDto: UserEditMdpDto) {
        try {
            return await this.usersService.editMdp(mdpDto);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Post('edit/name')
    async editName(@Body() nameDto: UserEditNameDto) {
        try {
            return await this.usersService.editName(nameDto);
        }
        catch (error) {
            console.log(error);
            throw error;
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
            throw error;
        }
    }
}