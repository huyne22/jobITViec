import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('resumes')
export class ResumesController {
    constructor(private readonly resumesService: ResumesService) { }

    @Post()
    @ResponseMessage("Create a new Resume")
    create(@Body() createResumeDto: CreateResumeDto, @User() user: IUser) {
        return this.resumesService.create(createResumeDto, user);
    }
    @Get()
    @ResponseMessage("Fetch List Resumes")
    findAll(
        @Query("current") currentPage: string,
        @Query("pageSize") limit: string,
        @Query() qs: string,
    ) {
        return this.resumesService.findAll(+currentPage, +limit, qs);
    }

    @Get(':id')
    @ResponseMessage("Fetch a Resume by id")
    findOne(@Param('id') id: string) {
        return this.resumesService.findOne(id);
    }

    @Post('by-user')
    @ResponseMessage("Fetch a Resume by user")
    getResumeByUser(@User() user: IUser) {
        return this.resumesService.findByUsers(user);
    }

    @Patch(':id')
    @ResponseMessage("Update status resume")
    updateStatus(
        @Param('id') id: string,
        @Body("status") status: string,
        @User() user: IUser) {
        return this.resumesService.update(id, status, user);
    }

    @Delete(':id')
    @ResponseMessage("Delete Resume success")
    remove(
        @Param('id') id: string,
        @User() user: IUser
    ) {
        return this.resumesService.remove(id, user);
    }
}
