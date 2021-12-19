import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AngularModule } from './angular/angular.module';
import { AccountModule } from './account/account.module';
// import { TimelogsModule } from './timelogs/timelogs.module';
// import { TimesheetModule } from './timesheet/timesheet.module';
import { UsersModule } from './users/users.module';
// import { CompanyModule } from './company/company.module';
import { JwtModule } from '@nestjs/jwt';

import { ScheduleModule } from '@nestjs/schedule';
// import { ScheduleModule } from 'nest-schedule';
// import { CutoffModule } from './cutoff/cutoff.module';
// import { LeavesModule } from './leaves/leaves.module';
// import { EmploymentTypeModule } from './employment-type/employment-type.module';
// import { DepartmentsModule } from './departments/departments.module';
// import { JobTitlesModule } from './job-titles/job-titles.module';

// import { CronService } from './cron/cron.service';
import { FilesController } from './files/files.controller';
import { FilesModule } from './files/files.module';
import { GendersModule } from './genders/genders.module';
import { ErrorController } from './error/error.controller';
import { ErrorModule } from './error/error.module';

import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';

const nodeExternals = require('webpack-node-externals');

@Module({
    imports: [
        ScheduleModule.forRoot(),
        // ScheduleModule.register(),
        // AngularModule.forRoot({
        //     rootPath: 'ng/dist/ng'
        // }),
        JwtModule.register({
            secretOrPrivateKey: 'neoleulsalanghae,naeanaeya.'
        }),
        AccountModule,
        // TimelogsModule,
        // TimesheetModule,
        UsersModule,
        // CompanyModule,
        // CutoffModule,
        FilesModule,
        ErrorModule,
        GendersModule,
        // LeavesModule,
        // EmploymentTypeModule,
        // DepartmentsModule,
        // JobTitlesModule
    ],
    controllers: [AppController, FilesController, ErrorController],
    providers: [
        AppService,
        // CronService,
        {
            provide: APP_INTERCEPTOR,
            useClass: AuthorizationInterceptor,
        },
    ]
})
export class AppModule {}
