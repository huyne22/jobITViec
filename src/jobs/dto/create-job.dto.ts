import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    logo: string
}
export class CreateJobDto {
    //gọi là class validator
    @IsNotEmpty({ message: 'Name ko dc để trống' })
    name: string;

    @IsNotEmpty({ message: 'skills ko dc để trống' })
    @IsArray({ message: 'skills có định dạng là array' })
    @IsString({ each: true, message: 'skill định dạng là string' })
    skills: string;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @IsNotEmpty({ message: 'location ko dc để trống' })
    location: string;

    @IsNotEmpty({ message: 'salary ko dc để trống' })
    salary: number;

    @IsNotEmpty({ message: 'quantity ko dc để trống' })
    quantity: number;

    @IsNotEmpty({ message: 'level ko dc để trống' })
    level: string;

    @IsNotEmpty({ message: 'description ko dc để trống' })
    description: string;

    @IsNotEmpty({ message: 'startDate ko dc để trống' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'startDate có định dạng là date' })
    startDate: Date

    @IsNotEmpty({ message: 'endDate ko dc để trống' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'endDate có định dạng là date' })
    endDate: Date

    @IsNotEmpty({ message: 'isActive ko dc để trống' })
    @IsBoolean({ message: 'isActive có định dạng là boolean' })
    isActive: boolean

}