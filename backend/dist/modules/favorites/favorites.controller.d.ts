import { FavoritesService } from "./favorites.service";
import { FavoriteDto } from "./dto/favorite.dto";
export declare class FavoritesController {
    private favService;
    constructor(favService: FavoritesService);
    getFavorites(): Promise<import("./favorite.model").Favorite[]>;
    getFavoritesType(id: string): Promise<import("./favorite.model").Favorite[]>;
    addFavorite(favDto: FavoriteDto): Promise<import("./favorite.model").Favorite>;
    removeFavorite(favDto: FavoriteDto): Promise<void>;
}
