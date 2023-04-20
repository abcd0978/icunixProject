import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import envReader from 'src/common/config/reader';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            username: envReader.get<string>('TYPEORM_USERNAME'),
            password: envReader.get<string>('TYPEORM_PASSWORD'),
            port: +envReader.get<number>('TYPEORM_PORT'),
            host: envReader.get<string>('TYPEORM_HOST'),
            database: envReader.get<string>('TYPEORM_DATABASE'),
            entities: ['dist/**/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true,
        };
    }
}
