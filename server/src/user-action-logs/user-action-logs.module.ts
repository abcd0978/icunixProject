import { Module } from '@nestjs/common';
import { UserActionLogsService } from './user-action-logs.service';
import { UserActionLogsController } from './user-action-logs.controller';

@Module({
    controllers: [UserActionLogsController],
    providers: [UserActionLogsService],
})
export class UserActionLogsModule {}
