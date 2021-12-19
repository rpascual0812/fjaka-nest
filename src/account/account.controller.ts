import { Controller, Get, Post, Put, Delete, Request, Response, Body, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { Account } from './account.entity';
// import { Session } from '../session/session.entity';
import { AccountService } from './account.service';

import * as moment from 'moment';

@Controller('accounts')
export class AccountController {
    constructor(
        private accountService: AccountService
    ){ }

    // @Get()
    // index(): Promise<Account[]> {
    //     return this.accountService.findAll();
    // }

    // @Get('test')
    // test() {
    //     return this.accountService.test();
    // }

    @Post('login')
    async login(@Response() res: any, @Body() body: any) {
        console.log(body);

        if (!(body && body.username && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
        }

        const account = await this.accountService.find({ 'username': body.username });
        if (account.length > 0) {
            if (await this.accountService.compareHash(body.password, account[0].password)) {
                const token = await this.accountService.createToken(account);

                if(token) {
                    // Delete existing session first
                    await this.accountService.destroySession(account[0].pk);

                    const sessionArray = [account[0].pk, token.token, moment().add(token.expiration, 'second').format('YYYY-MM-DD HH:mm:ss')];

                    // Create new session
                    const session = await this.accountService.createSession(sessionArray);
                    if(session)
                        return res.status(HttpStatus.OK).json(token);
                    else
                        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Failed to create user session.' });
                }

                return res.status(HttpStatus.FORBIDDEN).json({ message: 'Failed to create user session.' });
            }
        }

        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Invalid Username or password!' });
    }

    @Post()
    async create(@Response() res: any, @Body() body: any) {
        if (!(body && body.username && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
        }

        let user = await this.accountService.find({ username: body.username });

        if (user.length > 0) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username already exists' });
        } else {
            user = await this.accountService.create(body);
            if (user) {
                user.password = undefined;
            }
        }

        return res.status(HttpStatus.OK).json(user);
    }

    @Get('refresh')
    async refreshToken(@Request() req: any, @Response() res: any, @Body() body: any) {
        const token = req.headers.authorization.split(' ')[1];
        const account = await this.accountService.findToken(token);
        console.log(1);
        if(account) {
            console.log(2);
            const new_token = await this.accountService.createToken(account);
            if(new_token) {
                console.log(3);
                const refreshed = await this.accountService.refreshToken(token, new_token.token);
                return res.status(HttpStatus.OK).json({ message: 'Token successfully refreshed!', token: new_token.token });
            }
            else {
                console.log(4);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'A server error occurred. Please try again.' });
            }
        }

        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'You are not authorized to access this content.' });
    }
    //
    // @Put(':id/update')
    // async update(@Param('id') id, @Body() accountData: Account): Promise<any> {
    //     accountData.id = Number(id);
    //     console.log('Update #' + accountData.id);
    //     return this.accountService.update(accountData);
    // }
    //
    // @Delete(':id/delete')
    // async delete(@Param('id') id): Promise<any> {
    //     return this.accountService.delete(id);
    // }
}
