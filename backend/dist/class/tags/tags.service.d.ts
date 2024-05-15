import { Tag } from "./tag.model";
export declare class TagsService {
    private questModel;
    constructor(questModel: typeof Tag);
    findAll(): Promise<Tag[]>;
    getTag(id: string): Promise<string>;
}
