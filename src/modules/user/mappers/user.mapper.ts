import { Injectable } from "@nestjs/common";
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AddressMapper } from './address.mapper';
import { AddressEntity } from '../entities/address.entity';
import { UserDto } from '../dto/user.dto';
import { AddressDto } from '../dto/address.dto';

@Injectable()
export class UserMapper {
    constructor(
        private readonly addressMapper: AddressMapper
    ) {}

    public createUserDtoToUserEntity(createUserDto: CreateUserDto, address: AddressEntity): UserEntity {
        return new UserEntity({
            name: createUserDto.name,
            lastname: createUserDto.lastname,
            email: createUserDto.email,
            phone: createUserDto.phone,
            createdAt: new Date(),
            updatedAt: new Date(),
            address
        });
    }

    public userEntityToUserDto(user: UserEntity, addressDto: AddressDto): UserDto {
        return new UserDto({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            address: addressDto
        });
    }
}