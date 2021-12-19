import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database.module';

import { Account } from './account.entity';
import { Session } from '../session/session.entity';

import { AccountController } from './account.controller';

import { AccountService } from './account.service';

import { SessionService } from '../session/session.service';

import { HttpStrategy } from '../service/http.strategy';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Account, Session]),
    ],
    providers: [AccountService, SessionService, HttpStrategy],
    controllers: [AccountController]
})
export class AccountModule {}
