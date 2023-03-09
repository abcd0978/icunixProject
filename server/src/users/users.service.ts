import { Get, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: Repository<User>,
    ) {
        console.log('UsersService constructor');
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
