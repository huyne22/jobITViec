import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CompanyDocument, Company } from './schemas/company.schema';
import aqp from 'api-query-params';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
@Injectable()
export class CompaniesService {

    constructor(
        @InjectModel(Company.name)
        private CompanyModel: SoftDeleteModel<CompanyDocument>
    ) { }

    create(createCompanyDto: CreateCompanyDto, user: IUser) {
        return this.CompanyModel.create({
            ...createCompanyDto,
            createdBy: {
                _id: user?._id,
                email: user?.email
            }
        })
    }

    async findAll(currentPage: number, limit: number, qs: string) {
        const { filter, sort, population } = aqp(qs)
        delete filter.current;
        delete filter.pageSize;

        let offset = (+currentPage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;

        const totalItems = (await this.CompanyModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await this.CompanyModel.find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort as any)
            .populate(population)
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
            throw new BadRequestException("not found company with id")

        return await this.CompanyModel.findById(id)
    }

    async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
        return await this.CompanyModel.updateOne(
            { _id: id },
            {
                ...updateCompanyDto,
                updatedBy: {
                    _id: user._id,
                    email: user.email
                }
            }
        )
    }

    async remove(id: string, user: IUser) {
        await this.CompanyModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            }
        )
        return this.CompanyModel.softDelete({
            _id: id
        })
    }
}
