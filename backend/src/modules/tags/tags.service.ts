import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tag } from "./tag.model";
import { TagCreateDto } from "./dto/tag-create.dto";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class TagsService {

    constructor(@InjectModel(Tag) private tagModel: typeof Tag) { }

    findAll() {
        return this.tagModel.findAll();
    }

    async getTag(id: string) {
        return "Tag not found";
    }

    async createTag(tagDto: TagCreateDto) {
        const idTag = uuidv4();
        console.log(idTag);

        try {
            const tag = await this.tagModel.create({
                idTag: idTag,
                name: tagDto.name,
                description: tagDto.description,
                idUser: tagDto.idUser,
            });
            console.log("New tag" + tag);
            return tag;

        } catch (error) {
            console.log(error);
            throw new HttpException('Error during the creation of the tag', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteTag(id: string) {
        return "Tag deleted";
    }
}
