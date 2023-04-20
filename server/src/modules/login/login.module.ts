import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import envReader from 'src/common/config/reader';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: envReader.get('JWT_SECRET'),
                signOptions: { expiresIn: '1d' },
            }),
        }),
    ],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
