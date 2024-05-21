import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { TagCreateDto } from "./dto/tag-create.dto";

@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) { }

    @Get()
    findAll() {
        try {
            return this.tagsService.findAll();
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get(':id')
    getTag(@Param('id') id: string) {
        try {
            return this.tagsService.getTag(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('create')
    createTag(@Body() tagDto: TagCreateDto) {
        try {
            return this.tagsService.createTag(tagDto);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Delete(':id')
    deleteTag(@Param('id') id: string) {
        try {
            return this.tagsService.deleteTag(id);
        }
        catch (error) {
            console.log(error);
        }
    }

}