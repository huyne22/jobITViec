import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Public()
    @Post()
    @ResponseMessage("create a new user")
    async create(@Body() luonghuynestjs: CreateUserDto, @User() user: IUser) {
        let newUser = await this.usersService.create(luonghuynestjs, user)
        return {
            _id: newUser?._id,
            createAt: newUser?.createdAt
        }
    }

    // @Public()
    @Get()
    @ResponseMessage("Fetch user with paginate")
    findAll(
        @Query("current") currentPage: string,
        @Query("pageSize") limit: string,
        @Query() qs: string,
    ) {
        return this.usersService.findAll(+currentPage, +limit, qs);
    }

    @Public()
    @Get(':id')
    @ResponseMessage("Fetch user by id")
    async findOne(@Param('id') id: string
    ) {
        const foundUser = await this.usersService.findOne(id)
        return foundUser
    }

    @Public()
    @ResponseMessage("Update a user")
    @Patch()
    async update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser
    ) {
        let updateUser = await this.usersService.update(updateUserDto, user)
        return updateUser
    }

    @Public()
    @Delete(':id')
    @ResponseMessage("Delete a user")
    remove(@Param('id') id: string, @User() user: IUser
    ) {
        return this.usersService.remove(id, user)
    }
}
