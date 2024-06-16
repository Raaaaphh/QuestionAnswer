import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';


/**
 * Guard that checks if the user is a student
 * @returns {boolean} - True if the user is a student, false otherwise
 */
@Injectable()
export class StudentGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user.role !== 'Student') {
            throw new ForbiddenException('User is not authorized to access this resource');
        }

        return user.role === 'Student';
    }
}