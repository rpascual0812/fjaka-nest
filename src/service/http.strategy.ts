import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../account/account.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly accountService: AccountService) {
        super();
    }

    async validate(token: string) {
        const user = await this.accountService.validateUser(token);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
