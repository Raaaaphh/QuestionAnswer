// Recuperer les images avec id d'une question

import { Controller, Get, Param } from "@nestjs/common";
import { PicturesService } from "./pictures.service";

@Controller('pictures')
export class PicturesController {

    constructor(private picturesService: PicturesService) { }

    @Get(':id')
    getPicture(@Param('id') id: string) {
        return this.picturesService.getPicture(id);
    }

    @Get('question/:id')
    getPicturesByQuestion(@Param('id') id: string) {
        return this.picturesService.getPicturesByQuestion(id);
    }

    @Get('answer/:id')
    getPicturesByAnswer(@Param('id') id: string) {
        return this.picturesService.getPicturesByAnswer(id);
    }
}