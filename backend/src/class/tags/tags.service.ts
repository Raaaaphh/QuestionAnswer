import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tag } from "./tag.model";

@Injectable()
export class TagsService {

    constructor(@InjectModel(Tag) private questModel: typeof Tag) { }

    findAll() {
        return this.questModel.findAll();
    }

    async getTag(id: string) {
        return "Tag not found";
    }
}
