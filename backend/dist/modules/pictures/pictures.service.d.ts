import { Picture } from "./picture.model";
export declare class PicturesService {
    private pictModel;
    constructor(pictModel: typeof Picture);
    getPicture(id: string): Promise<Picture>;
    getPicturesByQuestion(id: string): Promise<Picture[]>;
    getPicturesByAnswer(id: string): Promise<Picture[]>;
    deletePicture(id: string): Promise<Picture>;
}
