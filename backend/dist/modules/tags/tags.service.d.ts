import { Tag } from "./tag.model";
import { TagCreateDto } from "./dto/tag-create.dto";
export declare class TagsService {
    private tagModel;
    constructor(tagModel: typeof Tag);
    findAll(): Promise<Tag[]>;
    getTag(id: string): Promise<string>;
    createTag(tagDto: TagCreateDto): Promise<Tag>;
    deleteTag(id: string): Promise<string>;
}
