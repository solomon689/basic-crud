import { AddressEntity } from '../entities/address.entity';
import { UserEntity } from '../entities/user.entity';
import { AddressDto } from './address.dto';

export class UserDto implements Partial<UserEntity> {
    public readonly name: string;
    public readonly lastname: string;
    public readonly email: string;
    public readonly phone: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly address?: AddressDto; 

    constructor(user: UserEntity) {
        Object.assign(this, user);
    }
}