import { AddressEntity } from '../entities/address.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressDto implements Partial<AddressEntity> {
    @ApiProperty()
    public readonly region: string;
    @ApiProperty()
    public readonly city: string;
    @ApiProperty()
    public readonly country: string;
    @ApiProperty()
    public readonly streetAddress: string;
    @ApiProperty()
    public readonly postalZip: string;
    @ApiPropertyOptional()
    public readonly createdAt: Date;
    @ApiPropertyOptional()
    public readonly updatedAt: Date;
    
    constructor(address: AddressEntity) {
        Object.assign(this, address);
    }

}