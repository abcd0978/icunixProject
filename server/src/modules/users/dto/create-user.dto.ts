import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    readonly studentId: number;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
