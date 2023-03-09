import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UserActionLogsService } from './user-action-logs.service';
import { CreateUserActionLogDto } from './dto/create-user-action-log.dto';
import { UpdateUserActionLogDto } from './dto/update-user-action-log.dto';

@Controller('user-action-logs')
export class UserActionLogsController {
    constructor(
        private readonly userActionLogsService: UserActionLogsService,
    ) {}

    @Post()
    create(@Body() createUserActionLogDto: CreateUserActionLogDto) {
        return this.userActionLogsService.create(createUserActionLogDto);
    }

    @Get()
    findAll() {
        return this.userActionLogsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userActionLogsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserActionLogDto: UpdateUserActionLogDto,
    ) {
        return this.userActionLogsService.update(+id, updateUserActionLogDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userActionLogsService.remove(+id);
    }
}
