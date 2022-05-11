import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';
import { UserDto } from './dto/user.dto';
import { NOT_FOUND, SUCCESS } from '../../config/exception-constants';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Metodos para usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Este código de obtiene cuando el recurso se logro crear de manera exitosa dentro de la base de datos.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Este código se obtiene al ingresar un recurso con error de formato.'})
  @UseInterceptors(ResponseInterceptor)
  public async create(@Body() createUserDto: CreateUserDto) {
    const createdUser: UserEntity | null = await this.userService.create(createUserDto);
    return createdUser;
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Este código se obtiene si la petición resulta sin errores.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Este código se obtiene si ocurre algun problema inesperado al momento de realizar la petición.' })
  @UseInterceptors(ResponseInterceptor)
  public async findAll() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'Id del usuario que se desea buscar dentro de la base de datos.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Este código se obtiene si la petición resulta sin errores.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Este código se obtiene si no se encuentra el recurso.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Este código se obtiene al ingresar un recurso con error de formato.'})
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
  @ApiParam({ name: 'id', description: 'Id del usuario que se desea actualizar dentro de la base de datos.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Este código se obtiene si no se encuentra el recurso.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Este código se obtiene si la actualización del recurso resulta exitosa.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Este código se obtiene al ingresar un recurso con error de formato.'})
  @UseInterceptors(ResponseInterceptor)
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Id del usuario que se desea eliminar dentro de la base de datos.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Este código se obtiene si no se encuentra el recurso.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Este código se obtiene si la eliminación del recurso resulta exitosa.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Este código se obtiene al ingresar un recurso con error de formato.'})
  @UseInterceptors(ResponseInterceptor)
  public async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
