import { Tag } from "../tag.model";
import { TagCreateDto } from "../dto/tag-create.dto";
import { Sequelize } from "sequelize-typescript";
export declare class TagsService {
    private tagModel;
    private readonly sequelize;
    constructor(tagModel: typeof Tag, sequelize: Sequelize);
    findAll(): Promise<Tag[]>;
    getTag(id: string): Promise<Tag>;
    createTag(tagDto: TagCreateDto): Promise<Tag>;
    deleteTag(id: string): Promise<Tag>;
}
