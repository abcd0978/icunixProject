import {
    Controller,
    Post,
    Body,
    HttpStatus,
    HttpCode,
    Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

// "http::localhost:3001/login"
@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    async login(@Body() loginDto: LoginDto, @Res() Response: Response) {
        console.log('LoginController.login', loginDto);

        await this.loginService
            .login(loginDto)
            .then((data) => {
                console.log('LoginController data:', data);
                if (data != null) {
                    console.log('LoginController sending OK');
                    return Response.status(HttpStatus.OK).send(data);
                } else {
                    console.log('LoginController sending UNAUTHORIZED');
                    return Response.status(HttpStatus.UNAUTHORIZED).send();
                }
            })
            .catch((err) => {
                console.log('LoginController err:', err);
                console.log('LoginController sending UNAUTHORIZED');
                return Response.status(HttpStatus.UNAUTHORIZED).send();
            });
    }
}
