import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { AddressDto } from './address.dto';

export class CreateUserDto implements Partial<UserEntity> {
    @ApiProperty()
    public readonly name: string;
    @ApiProperty()
    public readonly lastname: string;
    @ApiProperty()
    public readonly email: string;
    @ApiProperty()
    public readonly phone?: string;
    @ApiProperty()
    public readonly address: AddressDto;
}
