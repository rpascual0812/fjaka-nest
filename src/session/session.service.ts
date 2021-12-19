import { Injectable } from '@nestjs/common';

// import { Repository, UpdateResult, DeleteResult, getConnection, getRepository, Raw } from 'typeorm';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { Session } from './session.entity';

@Injectable() // Only support SINGLETON scope
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
    ) { }

    async find(token: any): Promise <any> {
        let session = await this.sessionRepository.query(`
            select sessions.account_pk, expiration from sessions
            left join users on (sessions.account_pk = users.account_pk)
            where token = $1
        `, [token]);

        return session;
    }

    async update(token: any): Promise <any> {
        // update this query
        let session = await this.sessionRepository.query(`
            select * from sessions
            where token = $1
        `, [token]);

        return session;
    }
}
