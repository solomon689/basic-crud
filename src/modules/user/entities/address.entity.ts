import { IsNotEmpty } from 'class-validator';
import { Column, Entity, Generated, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    public id?: string;

    @Column({ type: 'varchar', length: 100 })
    @IsNotEmpty()
    public region: string;

    @Column({ type: 'varchar', length: 255, name: 'street_address' })
    @IsNotEmpty()
    public streetAddress: string;

    @Column({ type: 'varchar', length: 20, name: 'postal_zip' })
    public postalZip?: string;

    @Column({ type: 'varchar', length: 100 })
    public country: string;
    
    @Column({ type: 'varchar', length: 100 })
    public city: string;

    @Column({ type: 'date', name: 'created_at' })
    public createdAt: Date;

    @Column({ type: 'date', name: 'updated_at' })
    public updatedAt: Date;

    @OneToOne(() => UserEntity, (user) => user.address, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public userId?: string;

    constructor(address: AddressEntity) {
        Object.assign(this, address);
    }
}