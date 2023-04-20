import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
