import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
// import { Employee } from '../employee/employee.entity';
import { Session } from '../session/session.entity';

@Injectable()
export class AccountService {
    private saltRounds = 10;

    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
    ) { }

    async validateUser(token: string): Promise  <any> {
        //{ where : { token: token, expiration: Raw(alias =>`${alias} > NOW()`) }}
        console.log('validate user...');
        return await this.sessionRepository.query(`
            select
                token
            from sessions
            where token = $1
            and expiration >= now()
            ;
        `, [token]);
    }

    async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async find(account: any): Promise<any> {
        return await this.accountRepository.query(`
            select
                pk,
                username,
                password,
                verified,
                last_login,
                login_attempts
            from accounts
            where username = $1
            ;
        `, [account.username]);
    }

    async create(account: any): Promise<Account> {
        account.password = await this.getHash(account.password);

        return await this.accountRepository.query(`
            insert into accounts (username, password) values($1, $2);
        `, [account.username, account.password]);
    }
    async getHash(password: string|undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async createToken(account: any) {
        const expiresIn = 60 * 60 * 12; // 12 hours
        const secretOrKey = 'neoleulsalanghae,naeanaeya.';
        const user = { username: account.username };
        const token = jwt.sign(user, secretOrKey, { expiresIn });

        return { expiration: expiresIn, token };
    }

    async findToken(token: any): Promise<Session> {
        return await this.sessionRepository.query(`
            select
                accounts.username,
                sessions.token
            from sessions
            left join accounts on (sessions.account_pk = accounts.pk)
            where sessions.token = $1;
        `, [token]);
    }

    async refreshToken(old_token: any, new_token: any): Promise<Session> {
        let exp = moment().add(1, 'hour');
        return await this.sessionRepository.query(`
            update sessions set
            token = $2,
            expiration = $3
            where token = $1;
        `, [old_token, new_token, exp]);
    }

    async destroySession(account_pk: string) {
        console.log('deleting.. ', account_pk);
        return await this.sessionRepository.query(`
            delete from sessions where account_pk = $1
        `, [account_pk]);
    }

    async createSession(session: string[]): Promise<Session> {
        return await this.sessionRepository.query(`
            insert into sessions
            (account_pk, token, expiration)
            values($1,$2,$3);
        `, session);
    }






    // async update(accounts: Account): Promise<UpdateResult> {
    //     return await this.accountRepository.update(accounts.id, accounts);
    // }
    //
    // async delete(id): Promise<DeleteResult> {
    //     return await this.accountRepository.delete(id);
    // }
    //

    //

    //

    //



}
