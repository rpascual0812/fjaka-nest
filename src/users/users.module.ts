import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database.module';

// Entities
import { Users } from './users.entity';
import { UserDetails } from './user-details/user-details.entity';
import { Session } from '../session/session.entity';

// Controllers
import { UsersController } from './users/users.controller';
import { SessionController } from '../session/session.controller';

// Services
import { UsersService } from './users/users.service';
import { UserDetailsService } from './user-details/user-details.service';

import { SessionService } from '../session/session.service';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Users, UserDetails, Session]),
    ],
    providers: [UsersService, UserDetailsService, SessionService],
    controllers: [UsersController]
})
export class UsersModule {}
