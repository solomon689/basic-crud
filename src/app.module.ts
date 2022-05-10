import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { AddressEntity } from './modules/user/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'esteban666',
        database: 'basic-crud',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false
      })
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
