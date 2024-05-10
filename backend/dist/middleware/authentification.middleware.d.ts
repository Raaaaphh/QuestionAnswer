import { NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { Request, Response } from "express";
export declare class AuthentificationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
