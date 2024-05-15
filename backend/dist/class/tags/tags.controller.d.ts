import { TagsService } from "./tags.service";
import { TagCreateDto } from "./dto/tag-create.dto";
export declare class TagsController {
    private tagsService;
    constructor(tagsService: TagsService);
    findAll(): Promise<import("./tag.model").Tag[]>;
    getTag(id: string): Promise<string>;
    createTag(tagDto: TagCreateDto): Promise<import("./tag.model").Tag>;
    deleteTag(id: string): Promise<string>;
}
