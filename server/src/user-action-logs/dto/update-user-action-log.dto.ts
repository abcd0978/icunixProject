import { PartialType } from '@nestjs/mapped-types';
import { CreateUserActionLogDto } from './create-user-action-log.dto';

export class UpdateUserActionLogDto extends PartialType(
    CreateUserActionLogDto,
) {}
