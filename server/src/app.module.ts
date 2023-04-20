import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { DatabaseService } from './common/database/database.service';
import { getEnvPath } from './common/helper/env.helper';
import { UsersModule } from './modules/users/users.module';
import { LoginModule } from './modules/login/login.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [DatabaseModule],
            useClass: DatabaseService,
            inject: [DatabaseService],
        }),
        UsersModule,
        LoginModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
