import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity('user')
// eslint-disable-next-line prettier/prettier
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public id?: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  public name: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  public lastname: string;
  
  @Column({ type: 'varchar', length: 30 })
  public phone?: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @OneToOne(() => AddressEntity, (address) => address.userId, { cascade: true, onDelete: 'CASCADE' })
  public address: AddressEntity;

  @Column({ type: 'date', name: 'created_at' })
  public createdAt: Date;

  @Column({ type: 'date', name: 'updated_at' })
  public updatedAt: Date;

  constructor(user: UserEntity) {
    Object.assign(this, user);
  }
}
