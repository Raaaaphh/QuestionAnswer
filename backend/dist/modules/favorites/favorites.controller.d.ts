import { FavoritesService } from "./favorites.service";
export declare class FavoritesController {
    private favService;
    constructor(favService: FavoritesService);
    getFavorites(): Promise<import("./favorite.model").Favorite[]>;
    getFavoritesType(id: string): Promise<import("./favorite.model").Favorite[]>;
}
