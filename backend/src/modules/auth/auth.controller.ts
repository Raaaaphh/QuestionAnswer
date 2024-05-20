import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRegisterDto, AuthLoginDto } from "./dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Get('test')
    test() {
        return this.authService.test();
    }

    @Post('login')
    login(@Body() authlog: AuthLoginDto) {
        console.log(authlog);
        return this.authService.login(authlog);
    }

    @Post('register')
    register(@Body() authreg: AuthRegisterDto) {
        return this.authService.register(authreg);
    }
}