import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';

@Module({
    controllers: [ActionsController],
    providers: [ActionsService],
})
export class ActionsModule {}
