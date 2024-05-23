import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
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
        try {
            console.log(authlog);
            return this.authService.login(authlog);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Post('register')
    register(@Body() authreg: AuthRegisterDto) {
        try {
            console.log(authreg);
            return this.authService.register(authreg);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Patch('verify-email')
    async verifyEmail(@Body('emailToken') emailToken: string) {
        try {
            return await this.authService.verifyEmail(emailToken);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}