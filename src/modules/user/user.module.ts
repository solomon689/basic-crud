import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AddressEntity } from './entities/address.entity';
import { UserRepository } from './repositories/user.repository';
import { UserMapper } from './mappers/user.mapper';
import { AddressMapper } from './mappers/address.mapper';
import { VerifyUserIdMiddleware } from '../../common/middlewares/verify_user_id.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AddressEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserMapper,
    AddressMapper,
    VerifyUserIdMiddleware
  ],
  exports: [
    UserService
  ]
})
export class UserModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyUserIdMiddleware)
      .forRoutes({ path: 'user/:id', method: RequestMethod.PATCH });
  }
}
