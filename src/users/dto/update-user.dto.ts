import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

//cách 1
// export class UpdateUserDto extends PartialType(CreateUserDto) {
//     @IsOptional()
//     @IsEmail()
//     email: string;
//     @IsOptional()
//     @IsString()
//     name: string;
// }
//cách 2
export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
    @IsNotEmpty({ message: '_id ko duoc de trong' })
    _id: string
}