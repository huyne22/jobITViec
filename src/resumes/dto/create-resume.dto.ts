import { IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
export class CreateResumeDto {
    //gọi là class validator
    // @IsNotEmpty({ message: 'email ko dc để trống' })
    email: string;

    // @IsNotEmpty({ message: 'userId ko dc để trống' })
    userId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'url ko dc để trống' })
    url: string;

    // @IsNotEmpty({ message: 'status ko dc để trống' })
    status: string;

    @IsNotEmpty({ message: 'companyId ko dc để trống' })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'jobId ko dc để trống' })
    jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
    //gọi là class validator
    @IsNotEmpty({ message: 'url ko dc để trống' })
    url: string;

    @IsNotEmpty({ message: 'companyId ko dc để trống' })
    @IsMongoId({ message: 'companyId is a mongo id' })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'jobId ko dc để trống' })
    @IsMongoId({ message: 'jobId is a mongo id' })
    jobId: mongoose.Schema.Types.ObjectId;
}