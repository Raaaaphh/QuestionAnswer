import { Favorite } from "./favorite.model";
import { FavoriteAddDto } from "./dto/favorite-add.dto";
export declare class FavoritesService {
    private favModel;
    constructor(favModel: typeof Favorite);
    getFavorites(): Promise<Favorite[]>;
    getFavoritesType(id: string): Promise<Favorite[]>;
    addFavorite(favDto: FavoriteAddDto): Promise<Favorite>;
}
