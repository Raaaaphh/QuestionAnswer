import { TagsService } from "./tags.service";
export declare class TagsController {
    private tagsService;
    constructor(tagsService: TagsService);
    findAll(): Promise<import("./tag.model").Tag[]>;
    getTag(id: string): Promise<string>;
}
