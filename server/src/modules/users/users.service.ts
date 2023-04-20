import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        // Find the user with the same studentId, name, and password
        const existing_user = await this.usersRepository.findOneBy({
            studentId: createUserDto.studentId,
            name: createUserDto.name,
            password: createUserDto.password,
        });

        console.log('existing_user', existing_user);

        // if existing_user is null, then the user does not exist
        if (!existing_user) {
            const new_user = this.usersRepository.create(createUserDto);

            // log the new user
            console.log('new_user', new_user);

            // save the new user to database
            await this.usersRepository.save(new_user);

            // remove the password from the returned user
            new_user.password = '********';

            // return the new user
            return new_user;
        } else {
            // if existing_user is not null, then the user already exists
            // return error
            return null;
        }
    }

    findAllUser(): Promise<User[]> {
        // log the function call
        console.log('finding all users');

        return this.usersRepository.find();
    }

    findOneUserById(id: number) {
        // log the id
        console.log('finding user with id', id);

        const found_user = this.usersRepository.findOneBy({ id });

        // if found_user is null, then the user does not exist
        // return { result: 'error', message: 'User does not exist' }
        if (!found_user)
            return { result: 'error', message: 'User does not exist' };

        return found_user;
    }

    findOneUserByName(name: string): Promise<User> {
        // log the id
        console.log('finding user with name', name);

        return this.usersRepository.findOneBy({ name });
    }

    /**
     * @todo: implement this function
     */
    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        return null;

        // // find the user with the given id
        // const user = this.usersRepository.findOneBy({ id });

        // // if the user does not exist,
        // // return { result: 'error', message: 'User does not exist' }
        // if (!user) return { result: 'error', message: 'User does not exist' };

        // // if updateUserDto's curr_password does not match the user's password,
        // // return { result: 'error', message: 'Incorrect password' }
        // if (!(await user).comparePassword(updateUserDto.password))
        //     return { result: 'error', message: 'Incorrect password' };

        // // user's password is correct

        // // if updateUserDto has a new_password,
        // if (updateUserDto.new_password) {
        //     // update the user's password
        //     this.usersRepository.update(id, {
        //         password: updateUserDto.new_password,
        //         ...updateUserDto,
        //     });
        // } else {
        //     // updateUserDto does not have a new_password
        //     // update the user
        //     this.usersRepository.update(id, updateUserDto);
        // }

        // // return { result: 'success', message: 'updated' }
        // return { result: 'success', message: 'updated' };
    }

    /**
     * @todo: solve the problem of deleting a user
     *          - ERROR: Cannot read properties of null (reading 'comparePassword')
     */
    async removeUser(id: number, removeUserDto: RemoveUserDto): Promise<any> {
        // log the id
        console.log('deleting user with id', id);
        console.log('removeUserDto', removeUserDto);

        // find the user with the given id
        const user = await this.usersRepository.findOneBy({ id });

        // log the user
        console.log('user', user);

        // if the user does not exist,
        // return { result: 'success', message: 'User does not exist' }
        if (!user)
            return {
                result: 'success',
                message: 'Failed deleting User ' + id,
            };

        // if removeUserDto's password does not match the user's password,
        // return { result: 'error', message: 'Incorrect password' }
        const match = await user.isPassword(removeUserDto.password);
        if (!match) {
            return {
                result: 'error',
                message: 'Incorrect password',
            };
        }

        // user's password is correct
        // delete the user
        this.usersRepository.delete(id);

        return {
            result: 'success',
            message: 'Successfully deleted User ' + id,
        };
    }
}
