import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';

// "http::localhost:3001/users"
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        console.log('createUserDto', createUserDto);
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAllUser();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usersService.findOneUserById(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number, @Body() removeUserDto: RemoveUserDto) {
        return this.usersService.removeUser(id, removeUserDto);
    }
}
