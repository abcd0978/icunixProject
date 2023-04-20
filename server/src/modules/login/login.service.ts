import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LoginService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<any> {
        // logs function name and argument for debugging
        console.log('LoginService.login', loginDto);

        return this.usersService
            .findOneUserByName(loginDto.name)
            .then(async (user) => {
                console.log('user', user);
                if (user) {
                    // if user exists, then compare the password
                    console.log('LoginService calling comparePassword');
                    const match = await user.isPassword(loginDto.password);

                    // if password matches, then return the user
                    if (match) {
                        console.log('LoginService password matches');
                        return {
                            result: 'success',
                            data: user,
                            message: 'User ' + loginDto.name + ' Found',
                        };
                    } else {
                        // if password does not match, then return error
                        console.log('LoginService password does not match');
                        return {
                            result: 'error',
                            message: 'Password does not match',
                        };
                    }
                } else {
                    // if user is null, then the user does not exist
                    return {
                        result: 'success',
                        data: null,
                        message: 'User does not exist',
                    };
                }
            })
            .catch((err) => {
                console.log('err', err);
                return { result: 'error', message: err };
            });
    }
}
