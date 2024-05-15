import { Controller, Get, Param } from "@nestjs/common";
import { TagsService } from "./tags.service";

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



}