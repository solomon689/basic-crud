import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';
import { UserDto } from './dto/user.dto';
import { NOT_FOUND } from '../../config/exception-constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user methods')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(ResponseInterceptor)
  public async create(@Body() createUserDto: CreateUserDto) {
    const createdUser: UserEntity | null = await this.userService.create(createUserDto);
    return createdUser;
  }

  @Get()
  @UseInterceptors(ResponseInterceptor)
  public async findAll() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  @UseInterceptors(ResponseInterceptor)
  public async findOne(@Param('id') id: string) {
    const userFound: UserDto | null = await this.userService.findOne(id);

    if (!userFound) {
      throw new HttpException({
        status: NOT_FOUND,
        response: { count: 0, data: null }
      }, HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  @Patch(':id')
  @UseInterceptors(ResponseInterceptor)
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseInterceptors(ResponseInterceptor)
  public async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
