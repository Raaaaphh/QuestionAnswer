import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { HttpException, HttpStatus } from "@nestjs/common";
import { Tag } from "../tag.model";
import { TagCreateDto } from "../dto/tag-create.dto";

@Injectable()
export class TagsService {

    constructor(@InjectModel(Tag) private tagModel: typeof Tag) { }

    findAll() {
        return this.tagModel.findAll();
    }

    async getTag(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid UUID');
        }
        const tag = await this.tagModel.findOne({ where: { idTag: id } });
        if (!tag) {
            throw new NotFoundException('Tag not found');
        }
        return tag;
    }

    async createTag(tagDto: TagCreateDto) {
        const idTag = uuidv4();
        try {
            if (tagDto.name.length > 20) {
                throw new BadRequestException('Tag name too long');
            }

            const tagName = tagDto.name.toLowerCase();
            const similarTag = await this.tagModel.findOne({ where: { name: tagName } });
            if (similarTag) {
                throw new ConflictException('Tag already exists');
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
            if (error instanceof BadRequestException || error instanceof ConflictException) {
                throw error;
            }
            throw new HttpException('Error during the creation of the tag', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteTag(id: string) {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Invalid UUID');
        }
        const tag = await this.tagModel.findOne({ where: { idTag: id } });
        if (!tag) {
            throw new NotFoundException('Tag not found');
        }
        await tag.destroy();
        return tag;
    }
}
