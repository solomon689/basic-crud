import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getConnection, Repository, UpdateResult } from "typeorm";
import { UserEntity } from '../entities/user.entity';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../../../config/exception-constants';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public createUser(user: UserEntity): Promise<UserEntity | null> {
        try {
            return this.userRepository.save(user);
        } catch (error) {
            throw new HttpException({
                status: BAD_REQUEST,
                response: { count: 0, data: null }
            }, HttpStatus.BAD_REQUEST);
        }
    }

    public findAllUsers(): Promise<UserEntity[] | null> {
        try {
            const usersFound: Promise<UserEntity[]> = this.userRepository.find({
                relations: ['address']
            });
            
            if (!usersFound) return null;

            return usersFound;
        } catch (error) {
            console.error(error);
            throw new HttpException({
                status: INTERNAL_SERVER_ERROR,
                response: { count: 0, data: null }
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async findOneById(id: string): Promise<UserEntity | null> {
        try {
            const userFound: UserEntity = await this.userRepository.findOne(id, {
                relations: ['address']
            }); 

            if (!userFound) return null;

            return userFound;
        } catch (error) {
            console.error(error);
            throw new BadRequestException({
                status: BAD_REQUEST,
                response: { count: 0, data: null }
            });
        }
    }

    public updateUserInfo(id: string, updateUserDto: Partial<CreateUserDto>): Promise<UpdateResult> {
        try {
            const partialUser: Partial<CreateUserDto> = {};
            const { address, ...destructuredUser } = updateUserDto;
            Object.assign(partialUser, destructuredUser);

            const update = getConnection()
                .createQueryBuilder()
                .update(UserEntity)
                .set(partialUser)
                .where('id = :id', { id })
                .execute();

            return update;
        } catch (error) {
            console.error(error);
            throw new HttpException({
                status: BAD_REQUEST,
                message: 'Ha ocurrido un error inesperado'
            }, HttpStatus.BAD_REQUEST);
        }
    }

    public deleteUserInfo(id: string) {
        try {
            const deletedUser: Promise<DeleteResult> = this.userRepository.delete(id);

            return deletedUser; 
        } catch (error) {
            console.error(error);
            throw new HttpException({
                status: BAD_REQUEST,
                response: { count: 0, response: null }
            }, HttpStatus.BAD_REQUEST);
        }
    }
}