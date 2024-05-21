"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const users_service_1 = require("../modules/users/users.service");
let JwtMiddleware = class JwtMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        const excludedPaths = ['/auth/login', '/auth/register'];
        if (excludedPaths.includes(req.path)) {
            return next();
        }
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header is missing');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Token is missing');
        }
        try {
            const decoded = jwt.verify(token, 'questionanswer');
            if (typeof decoded === 'string' || !decoded.id) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            const user = await this.userService.findById(decoded.id);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            req.user = user;
            next();
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.JwtMiddleware = JwtMiddleware;
exports.JwtMiddleware = JwtMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], JwtMiddleware);
//# sourceMappingURL=jwt.middleware.js.map