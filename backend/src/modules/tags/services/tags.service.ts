import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { HttpException, HttpStatus } from "@nestjs/common";
import { Tag } from "../tag.model";
import { TagCreateDto } from "../dto/tag-create.dto";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class TagsService {

    constructor(@InjectModel(Tag) private tagModel: typeof Tag, private readonly sequelize: Sequelize) { }

    findAll() {
        return this.tagModel.findAll();
    }

    async getTag(id: string) {
        if (!isValidUUID(id)) {
            throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
        }
        const tag = await this.tagModel.findOne({ where: { idTag: id } });
        if (!tag) {
            throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
        }
        return tag;
    }

    async createTag(tagDto: TagCreateDto) {
        const idTag = uuidv4();
        try {
            if (tagDto.name.length > 20) {
                throw new HttpException('Name too long', HttpStatus.BAD_REQUEST);
            }

            const tagName = tagDto.name.toLowerCase();
            const similarTag = await this.tagModel.findOne({ where: { name: tagName } });
            if (similarTag) {
                throw new HttpException('Tag already exists', HttpStatus.BAD_REQUEST);
            }

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
        if (!isValidUUID(id)) {
            throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
        }
        const tag = await this.tagModel.findOne({ where: { idTag: id } });
        if (!tag) {
            throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
        }
        await tag.destroy();
        return tag;
    }
}
