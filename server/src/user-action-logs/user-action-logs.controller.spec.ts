import { Test, TestingModule } from '@nestjs/testing';
import { UserActionLogsController } from './user-action-logs.controller';
import { UserActionLogsService } from './user-action-logs.service';

describe('UserActionLogsController', () => {
    let controller: UserActionLogsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserActionLogsController],
            providers: [UserActionLogsService],
        }).compile();

        controller = module.get<UserActionLogsController>(
            UserActionLogsController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
