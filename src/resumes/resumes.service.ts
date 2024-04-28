import { Injectable } from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class ResumesService {
    constructor(
        @InjectModel(Resume.name)
        private resumeModel: SoftDeleteModel<ResumeDocument>
    ) { }
    async create(createUserCvDto: CreateUserCvDto, user: IUser) {
        const { url, companyId, jobId
        } = createUserCvDto;

        const { email, _id
        } = user;

        let newCV = await this.resumeModel.create({
            url, companyId, email, jobId,
            status: "PENDING",
            createdBy: {
                _id, email
            },
            history: [
                {
                    status: "PENDING",
                    updatedAt: new Date,
                    updatedBy: {
                        _id: user._id,
                        email: user.email
                    }
                }
            ]
        })
        return {
            _id: newCV?._id,
            createdAt: newCV?.createdAt
        };
    }

    async findAll(currentPage: number, limit: number, qs: string) {
        const { filter, sort, population, projection } = aqp(qs)
        delete filter.current;
        delete filter.pageSize;

        let offset = (+currentPage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;

        const totalItems = (await this.resumeModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.resumeModel.find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort as any)
            .populate(population)
            .select(projection as any)
            .exec()
        return {
            meta: {
                current: currentPage, //trang hiện tại
                pageSize: limit, //số lượng bản ghi đã lấy
                pages: totalPages, //tổng số trang với điều kiện query
                total: totalItems // tổng số phần tử (số bản ghi)
            },
            result //kết quả query
        }
    }

    async findOne(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id))
            return 'not found Resume'

        return await this.resumeModel.findById(id)
    }

    async findByUsers(user: IUser) {

        const a = await this.resumeModel.find({
            'createdBy._id': user?._id
        })
            .sort("-createdAt")
            .populate([
                {
                    path: "companyId",
                    select: { name: 1 }
                },
                {
                    path: "jobId",
                    select: { name: 1 }
                }
            ])
        return a;

    }



    async update(_id: string, status: string, user: IUser) {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return 'not found Resume'
        const updated = await this.resumeModel.updateOne(
            { _id },
            {
                status,
                updatedBy: {
                    _id: user._id,
                    email: user.email
                },
                $push: {
                    history: {
                        status: status,
                        updatedAt: new Date,
                        updatedBy: {
                            _id: user._id,
                            email: user.email
                        }

                    }
                }
            }
        )

        return updated
    }

    async remove(id: string, user: IUser) {

        if (!mongoose.Types.ObjectId.isValid(id))
            return 'not found Resume'
        await this.resumeModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            }
        )
        return this.resumeModel.softDelete({
            _id: id
        })
    }
}