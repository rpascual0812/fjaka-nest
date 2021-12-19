import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { DatabaseModule } from '../database.module';

import { Genders } from './genders.entity';
import { Session } from '../session/session.entity';

import { GendersController } from './genders.controller';

import { GendersService } from './genders.service';
import { SessionService } from '../session/session.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'bearer' }),
        DatabaseModule,
        TypeOrmModule.forFeature([Genders,Session])
    ],
    providers: [GendersService, SessionService],
    controllers: [GendersController],
    exports: [PassportModule]
})
export class GendersModule {}
