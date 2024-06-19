import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../../../guards/admin.guard";
import { TagsService } from "../services/tags.service";
import { TagCreateDto } from "../dto/tag-create.dto";

@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) { }

    @Get()
    findAll() {
        try {
            return this.tagsService.findAll();
        }
        catch (error) {
            throw new HttpException('Error during the retrieval of the tags', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    getTag(@Param('id') id: string) {
        try {
            return this.tagsService.getTag(id);
        }
        catch (error) {
            throw error;
        }
    }

    @Post('create')
    @UseGuards(AdminGuard)
    createTag(@Body() tagDto: TagCreateDto) {
        try {
            return this.tagsService.createTag(tagDto);
        }
        catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    deleteTag(@Param('id') id: string) {
        try {
            return this.tagsService.deleteTag(id);
        }
        catch (error) {
            throw error;
        }
    }

}