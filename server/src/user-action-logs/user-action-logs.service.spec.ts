import { Test, TestingModule } from '@nestjs/testing';
import { UserActionLogsService } from './user-action-logs.service';

describe('UserActionLogsService', () => {
    let service: UserActionLogsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserActionLogsService],
        }).compile();

        service = module.get<UserActionLogsService>(UserActionLogsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
