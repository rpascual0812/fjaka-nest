import { Controller, Get, Post, Put, Delete, Request, Response, Body, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { Employee } from '../employee/employee.entity';
// import { Timelogs } from './timelogs.entity';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
    constructor(
        private sessionService: SessionService,
    ){ }

    @Get('/')
    @UseGuards(AuthGuard('bearer'))
    async get(@Request() req: any, @Response() res: any, @Body() body: any) {

        console.log(1, AuthGuard('bearer'));

        const token = req.headers.authorization.split(' ')[1];
        const session = await this.sessionService.find(token);
        console.log('session', session);
        // console.log('token', token);
        return res.status(HttpStatus.OK).json({ data: session });
    }
}
