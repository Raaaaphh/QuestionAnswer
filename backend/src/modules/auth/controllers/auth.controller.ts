import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Patch, Post, Query, Request } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthLoginDto, AuthRegisterDto } from "../dto";


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
            if (error instanceof ForbiddenException || error instanceof BadRequestException) {
                throw error;
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('logout')
    logout(@Request() req) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            return this.authService.logout(token);
        }
        catch (error) {
            console.log(error);
            if (error instanceof BadRequestException || error instanceof ForbiddenException) {
                throw error;
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);

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
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *  Verify the email of the user
     * @param emailToken 
     * @returns 
     */
    @Patch('verify-email')
    async verifyEmail(@Body('emailToken') emailToken: string) {
        try {
            return await this.authService.verifyEmail(emailToken);
        } catch (error) {
            console.log(error);
            if (error instanceof BadRequestException || error instanceof ForbiddenException) {
                throw error;
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *  Register a user with an invitation token
     * @param token 
     * @param authreg 
     * @returns 
     */
    @Post('register/invitation?')
    async registerWithToken(@Query('token') token: string, @Body() authreg: AuthRegisterDto) {
        try {
            return await this.authService.registerWithToken(token, authreg);
        } catch (error) {
            console.log(error);
            if (error instanceof BadRequestException || error instanceof ForbiddenException) {
                throw error;
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}