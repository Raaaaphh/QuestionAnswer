import { Favorite } from "./favorite.model";
import { FavoriteDto } from "./dto/favorite.dto";
export declare class FavoritesService {
    private favModel;
    constructor(favModel: typeof Favorite);
    getFavorites(): Promise<Favorite[]>;
    getFavoritesType(id: string): Promise<Favorite[]>;
    addFavorite(favDto: FavoriteDto): Promise<Favorite>;
    removeFavorite(favDto: FavoriteDto): Promise<void>;
}
