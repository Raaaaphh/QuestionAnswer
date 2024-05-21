import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserEditMdpDto, UserEditNameDto } from "./dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    @Post('edit/mdp')
    async editMdp(@Body() mdpDto: UserEditMdpDto) {
        return this.usersService.editMdp(mdpDto);
    }

    @Post('edit/name')
    async editName(@Body() nameDto: UserEditNameDto) {
        return this.usersService.editName(nameDto);
    }
}