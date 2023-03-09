import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ActionsModule } from './actions/actions.module';
import { RolesModule } from './actions/roles/roles.module';
import { StudentsModule } from './roles/students/students.module';
import { UserActionLogsModule } from './user-action-logs/user-action-logs.module';
import { UsersModule } from './users/users.module';
import 'dotenv/config';

@Module({
    imports: [
        UsersModule,
        UserActionLogsModule,
        StudentsModule,
        RolesModule,
        ActionsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
