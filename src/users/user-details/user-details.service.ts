import { Injectable } from '@nestjs/common';

import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users.entity';
import { UserDetails } from './user-details.entity';

@Injectable()
export class UserDetailsService {
    constructor(
        @InjectRepository(UserDetails)
        private userDetailsRepositorys: Repository<UserDetails>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    async create(userDetails: UserDetails): Promise<UserDetails> {
        // const _users = await this.usersRepository.findOne({ where : { id: userDetails.usersId }});

        // console.log(_users);
        return await this.userDetailsRepositorys.create(userDetails);
    }

    async find(token: any): Promise <any> {
        let data: any;
        data = await this.userDetailsRepositorys.query(`
            with Q as (
                select
                    account_pk
                from sessions
                where token = $1
            )
            select
                user_details.parent,
                user_details.field,
                user_details.value
            from Q
            left join users on (Q.account_pk = userss.account_pk)
            left join user_details on (userss.pk = user_details.users_pk)
            ;
        `, [token]);

        return data;
    }
}
