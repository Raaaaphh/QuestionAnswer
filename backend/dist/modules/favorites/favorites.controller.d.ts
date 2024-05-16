import { FavoritesService } from "./favorites.service";
import { FavoriteAddDto } from "./dto/favorite-add.dto";
export declare class FavoritesController {
    private favService;
    constructor(favService: FavoritesService);
    getFavorites(): Promise<import("./favorite.model").Favorite[]>;
    getFavoritesType(id: string): Promise<import("./favorite.model").Favorite[]>;
    addFavorite(favDto: FavoriteAddDto): Promise<import("./favorite.model").Favorite>;
}
