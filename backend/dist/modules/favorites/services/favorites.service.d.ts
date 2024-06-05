import { Favorite } from "../favorite.model";
import { FavoriteDto } from "../dto/favorite.dto";
export declare class FavoritesService {
    private favModel;
    constructor(favModel: typeof Favorite);
    getFavorites(): Promise<Favorite[]>;
    getFavoritesQuestion(id: string): Promise<Favorite[]>;
    getFavoritesUser(id: string): Promise<Favorite[]>;
    notifyFavorites(id: string): Promise<Favorite[]>;
    deleteNotified(dto: FavoriteDto): Promise<Favorite>;
    addFavorite(favDto: FavoriteDto): Promise<Favorite>;
    removeFavorite(favDto: FavoriteDto): Promise<Favorite>;
}
