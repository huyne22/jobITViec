import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateRoleDto {

    @IsNotEmpty({ message: 'name ko dc để trống' })
    name: string;

    @IsNotEmpty({ message: 'description ko dc để trống' })
    description: number;

    @IsBoolean()
    @IsNotEmpty({ message: 'isActive ko dc để trống' })
    isActive: boolean;

    @IsArray()
    // @IsMongoId()
    @IsNotEmpty({ message: 'permissions ko dc để trống' })
    permissions: mongoose.Schema.Types.ObjectId[];
}