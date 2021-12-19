import { Controller, Get, Post, Param, Response, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('error')
export class ErrorController {
    constructor(

    ){ }

    @Post('/error')
    @UseGuards(AuthGuard('bearer'))
    async save(@Request() req: any, @Response() res: any) {
        console.log(req, res);
    }
}
