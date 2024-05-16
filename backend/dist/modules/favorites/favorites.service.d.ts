import { Favorite } from "./favorite.model";
export declare class FavoritesService {
    private favModel;
    constructor(favModel: typeof Favorite);
    getFavorites(): Promise<Favorite[]>;
    getFavoritesType(id: string): Promise<Favorite[]>;
}
