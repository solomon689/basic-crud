import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { AddressDto } from './dto/address.dto';
import { AddressMapper } from './mappers/address.mapper';
import { UserDto } from './dto/user.dto';
import { AddressEntity } from './entities/address.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
    private readonly addressMapper: AddressMapper
  ) { }

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const address: AddressEntity = this.addressMapper.addressDtoToAddressEntity(createUserDto.address);
    const userEntity: UserEntity = this.userMapper.createUserDtoToUserEntity(createUserDto, address);
    return await this.userRepository.createUser(userEntity);
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAllUsers();
  }

  public async findOne(id: string): Promise<UserDto | null> {
    const user: UserEntity = await this.userRepository.findOneById(id);

    if (!user) return null;

    const addressDto: AddressDto = this.addressMapper.addressEntityToAddressDto(user.address);
    const userDto: UserDto = this.userMapper.userEntityToUserDto(user, addressDto);
    
    return userDto;
  }

  public update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.updateUserInfo(id, updateUserDto);
  }

  public remove(id: string): Promise<DeleteResult> {
    return this.userRepository.deleteUserInfo(id);
  }
}
