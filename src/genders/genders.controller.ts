import { Controller, Get, Post, Put, Delete, Request, Response, Body, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GendersService } from './genders.service';

import { Session } from '../session/session.entity';
import { SessionService } from '../session/session.service';

@Controller('genders')
export class GendersController {
    constructor(
        private gendersService: GendersService,
        private sessionService: SessionService,
    ){ }

    @Get('/select')
    @UseGuards(AuthGuard('bearer'))
    async fetch(@Request() req: any, @Response() res: any, @Body() body: any) {
        const token = req.headers.authorization.split(' ')[1]; //#IMPROVE
        const session = await this.sessionService.find(token);
        if(session) {
            const genders = await this.gendersService.select();
            return res.status(HttpStatus.OK).json(genders);
        }
        else {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Session Expired' });
        }
    }
}
