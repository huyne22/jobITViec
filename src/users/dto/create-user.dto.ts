import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string
}


export class CreateUserDto {
    //gọi là class validator
    @IsNotEmpty({ message: 'Name ko dc để trống' })
    name: string;

    @IsEmail({}, { message: 'Email ko đúng định dạng' })
    @IsNotEmpty({ message: 'Email ko dc để trống' })
    email: string;

    @IsNotEmpty({ message: 'Email ko dc để trống' })
    password: string;

    @IsNotEmpty({ message: 'Email ko dc để trống' })
    age: string;

    @IsNotEmpty({ message: 'Email ko dc để trống' })
    gender: string;

    @IsNotEmpty({ message: 'Email ko dc để trống' })
    address: string;

    @IsNotEmpty({ message: 'Role ko dc để trống' })
    @IsMongoId({ message: 'Role có định dạng là mongo id' })
    role: mongoose.Schema.Types.ObjectId;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company

}
export class RegisterUserDto {
    @IsNotEmpty({ message: 'Name ko dc để trống' })
    name: string;
    @IsEmail({}, { message: 'Email ko đúng định dạng' })
    @IsNotEmpty({ message: 'Email ko dc để trống' })
    email: string;
    @IsNotEmpty({ message: 'Email ko dc để trống' })
    password: string;
    @IsNotEmpty({ message: 'Email ko dc để trống' })
    age: string;
    @IsNotEmpty({ message: 'Email ko dc để trống' })
    gender: string;
    @IsNotEmpty({ message: 'Email ko dc để trống' })
    address: string;
}