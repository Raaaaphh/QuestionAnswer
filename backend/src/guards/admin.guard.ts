import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';


/**
 * Guard that checks if the user is an admin
 * @returns {boolean} - True if the user is an admin, false otherwise
 */
@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user.role !== 'Lecturer' && user.role !== 'SuperAdmin') {
            throw new ForbiddenException('User is not authorized to access this resource');
        }

        return user.role === 'Lecturer' || user.role === 'SuperAdmin';
    }
}
