import { Module } from '@nestjs/common';
import { CheckerService } from './checker.service';
import { CheckerNotificationTask } from './tasks/checker-notification.task';

@Module({
  providers: [CheckerService, CheckerNotificationTask],
})
export class CheckerModule {}
