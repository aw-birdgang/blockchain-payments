import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CheckerService } from '../checker.service';

@Injectable()
export class CheckerNotificationTask {
  constructor(private readonly checkerService: CheckerService) {}

  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    this.checkerService.sendNotifications();
  }
}
