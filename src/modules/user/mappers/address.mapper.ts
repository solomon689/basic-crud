import { Injectable } from "@nestjs/common";
import { AddressEntity } from '../entities/address.entity';
import { AddressDto } from '../dto/address.dto';

@Injectable()
export class AddressMapper {
    constructor() { }

    public addressDtoToAddressEntity(address: AddressEntity): AddressEntity {
        return new AddressEntity({
            region: address.region,
            streetAddress: address.streetAddress,
            country: address.country,
            city: address.city,
            createdAt: new Date(),
            updatedAt: new Date(),
            postalZip: address.postalZip
        });
    }

    public addressEntityToAddressDto(address: AddressEntity): AddressDto {
        return new AddressDto({
            region: address.region,
            city: address.city,
            country: address.country,
            streetAddress: address.streetAddress,
            createdAt: address.createdAt,
            updatedAt: address.updatedAt,
            postalZip: address.postalZip
        });
    }
}