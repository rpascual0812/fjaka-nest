import { Injectable } from '@nestjs/common';

import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genders } from './genders.entity';

@Injectable()
export class GendersService {
    constructor(
        @InjectRepository(Genders)
        private gendersRepository: Repository<Genders>,
    ) { }


    async select(): Promise<Genders> {
        return await this.gendersRepository.query(`
            select
                pk,
                name
            from genders
            where archived = false
        `);
    }
}
