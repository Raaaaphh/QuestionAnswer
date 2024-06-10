import { Controller, Delete, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { PicturesService } from "../services/pictures.service";

@Controller('pictures')
export class PicturesController {

    constructor(private picturesService: PicturesService) { }

    @Get('')
    async getPicture(@Param('id') id: string) {
        try {
            const picture = await this.picturesService.getPicture(id);
            return picture;
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('question/')
    async getPicturesByQuestion(@Param('id') id: string) {
        try {
            const pictures = await this.picturesService.getPicturesByQuestion(id);
            return pictures;
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('answer/')
    async getPicturesByAnswer(@Param('id') id: string) {
        try {
            const pictures = await this.picturesService.getPicturesByAnswer(id);
            return pictures;
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('')
    async deletePicture(@Param('id') id: string) {
        try {
            const picture = await this.picturesService.deletePicture(id);
            return picture;
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}