import { Controller, Get, Post, Put, Req, Delete, Request, Response, Body, Param, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Users } from '../users.entity';
import { UsersService } from './users.service';

import { UserDetails } from '../user-details/user-details.entity';
import { UserDetailsService } from '../user-details/user-details.service';

import { Session } from '../../session/session.entity';
import { SessionService } from '../../session/session.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private userDetailsService: UserDetailsService,
        private sessionService: SessionService,
    ){ }

    @Post('/')
    @UseGuards(AuthGuard('bearer'))
    async find(@Request() req: any, @Response() res: any, @Body() body: any) {
        const token = req.headers.authorization.split(' ')[1]; //#IMPROVE
        const session = await this.sessionService.find(token);

        if(session) {
            const user = await this.usersService.find(session[0].account_pk);
            if(user) {
                console.log(user, body);
                const new_user = await this.usersService.create(user[0], body);
                return res.status(HttpStatus.OK).json(new_user[0]);
            }
            else {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
            }
        }
        else {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Session Expired' });
        }
    }

    @Get('/')
    @UseGuards(AuthGuard('bearer'))
    async fetch(@Request() req: any, @Response() res: any, @Body() body: any) {
        const token = req.headers.authorization.split(' ')[1]; //#IMPROVE
        const session = await this.sessionService.find(token);
        if(session) {
            console.log('query', req.query);
            const users = await this.usersService.fetch(req.query);
            return res.status(HttpStatus.OK).json(users);
        }
        else {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Session Expired' });
        }
    }
    //

    //
    // @Post()
    // async create(@Body() users: Users): Promise<any> {
    //     console.log('post empty');
    //     return this.usersService.create(users);
    // }
    //
    // @Post('details')
    // async saveDetails(@Body() userDetails: UserDetails): Promise<any> {
    //     return this.userDetailsService.create(userDetails);
    // }
    //
    // @Get('details')
    // async getDetails(@Request() req: any, @Response() res: any): Promise<any> {
    //     const token = req.headers.authorization.split(' ')[1];
    //     const data = await this.userDetailsService.find(token);
    //     return res.status(HttpStatus.OK).json(data);
    // }

}
