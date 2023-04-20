import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// "http::localhost:3001/"
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello(); // return 'Hello World!'
    }
}
