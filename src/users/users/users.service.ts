import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    async create(user: any, body: any): Promise<Users> {
        console.log('saving... ', user, body);
        let query: any;

        query = await this.usersRepository.query(
            `insert into users
            (
                account_pk,
                uuid,
                ronin,
                nickname,
                last_name,
                first_name,
                middle_name,
                mobile_number,
                email,
                birth_date,
                gender_pk,
                color
            )
            values
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            returning pk;`,
            [
                user.account_pk,
                uuidv4(),
                body.ronin,
                body.nickname,
                body.last_name,
                body.first_name,
                body.middle_name,
                body.mobile_number,
                body.email,
                body.birth_date,
                body.genders_pk,
                body.color
            ]
        );

        return query;
    }

    async fetch(params: any): Promise<Users> {
        let filters = JSON.parse(params.filters);
        let pagination = JSON.parse(params.pagination);

        let query = `
            select
                pk,
                account_pk,
                uuid,
                ronin,
                nickname,
                last_name,
                first_name,
                middle_name,
                birth_date,
                gender_pk,
                color,
                role
            from users
        `

        const offset:any = (pagination.page - 1) * (pagination.tableSize + 1);
        const limit:any = pagination.tableSize;

        let ret:any = {
            data: [],
            total: 0
        };

        if(filters.search) {
            query += ` where first_name ilike $1||'%' or last_name ilike $1||'%' or uuid ilike $1||'%' or ronin ilike $1||'%`;
            query += ` order by last_name offset $2 limit $3`;
            ret.data = await this.usersRepository.query(query, [filters.search, offset, limit]);
        }
        else {
            query += ` order by last_name offset $1 limit $2`;
            ret.data = await this.usersRepository.query(query, [offset, limit]);
        }

        const total:any = await this.count(filters);
        ret.total = total[0].count;

        return ret;
    }

    async count(filters:any) {
        let query = `
            select count(*) from users
        `
        let ret:any;
        if(filters.search) {
            query += ` where first_name ilike $1||'%' or last_name ilike $1||'%' or uuid ilike $1||'%' or ronin ilike $1||'%`;
            ret = await this.usersRepository.query(query, [filters.search]);
        }
        else {
            ret = await this.usersRepository.query(query);
        }

        return ret;
    }

    async find(account_pk: string): Promise<Users> {
        return await this.usersRepository.query(`
            select
                users.pk as users_pk,
                users.account_pk,
                uuid,
                ronin,
                nickname,
                last_name,
                first_name,
                middle_name,
                birth_date,
                gender_pk,
                color,
                role,
                accounts.username
            from accounts
            left join users on (accounts.pk = users.account_pk)
            where accounts.pk = $1
        `, [account_pk]);
    }
}
