import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable() // Only support SINGLETON scope
export class CronService {
    private readonly logger = new Logger(CronService.name);

    @Cron(CronExpression.EVERY_30_SECONDS)
    every30() {
        this.logger.debug('Called every 30 seconds');
    }

    @Cron('45 * * * * *')
    every45() {
        this.logger.debug('Called when the current second is 45');
    }

    // @Cron('* * * * *', {
    //     startTime: new Date(),
    //     endTime: new Date(),
    // })
    // async cronJob() {
    //     console.log('executing cron job');
    // }

    // @Timeout(5000)
    // onceJob() {
    //     console.log('executing once job');
    // }
    //
    // @Interval(60000)
    // intervalJob() {
    //     console.log('executing interval job', new Date());
    //
    //     // if you want to cancel the job, you should return true;
    //     // return true;
    // }
    //

}
