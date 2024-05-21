import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/modules/users/users.service';
interface CustomRequest extends Request {
    user?: any;
}
export declare class JwtMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UsersService);
    use(req: CustomRequest, res: Response, next: NextFunction): Promise<void>;
}
export {};
