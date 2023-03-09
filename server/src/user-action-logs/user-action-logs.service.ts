import { Injectable } from '@nestjs/common';
import { CreateUserActionLogDto } from './dto/create-user-action-log.dto';
import { UpdateUserActionLogDto } from './dto/update-user-action-log.dto';

@Injectable()
export class UserActionLogsService {
    create(createUserActionLogDto: CreateUserActionLogDto) {
        return 'This action adds a new userActionLog';
    }

    findAll() {
        return `This action returns all userActionLogs`;
    }

    findOne(id: number) {
        return `This action returns a #${id} userActionLog`;
    }

    update(id: number, updateUserActionLogDto: UpdateUserActionLogDto) {
        return `This action updates a #${id} userActionLog`;
    }

    remove(id: number) {
        return `This action removes a #${id} userActionLog`;
    }
}
