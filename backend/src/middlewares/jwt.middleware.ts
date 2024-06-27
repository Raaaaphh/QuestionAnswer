import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { UsersService } from 'src/modules/users/services/users.service';

interface CustomRequest extends Request {
    user?: any;
}

/**
 * Middleware to check if the user is authenticated
 */
@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService) { }

    async use(req: CustomRequest, res: Response, next: NextFunction) {
        const excludedPaths = ['/auth/login', '/auth/register'];
        if (excludedPaths.includes(req.path)) {
            return next();
        }

        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            const decoded = jwt.verify(token, 'questionanswer') as JwtPayload;
            if (typeof decoded === 'string' || !decoded.id) {
                throw new UnauthorizedException('Invalid token');
            }

            const user = await this.userService.findById(decoded.id);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            req.user = user;
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
