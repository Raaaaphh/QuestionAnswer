import { PicturesService } from "./pictures.service";
export declare class PicturesController {
    private picturesService;
    constructor(picturesService: PicturesService);
    getPicture(id: string): Promise<import("./picture.model").Picture>;
    getPicturesByQuestion(id: string): Promise<import("./picture.model").Picture[]>;
    getPicturesByAnswer(id: string): Promise<import("./picture.model").Picture[]>;
}
