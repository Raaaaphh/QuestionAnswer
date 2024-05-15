import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { TagCreateDto } from "./dto/tag-create.dto";

@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) { }

    @Get()
    findAll() {
        return this.tagsService.findAll();
    }

    @Get(':id')
    getTag(@Param('id') id: string) {
        return this.tagsService.getTag(id);
    }

    @Post('create')
    createTag(@Body() tagDto: TagCreateDto) {
        return this.tagsService.createTag(tagDto);
    }

    @Delete(':id')
    deleteTag(@Param('id') id: string) {
        return this.tagsService.deleteTag(id);
    }

}