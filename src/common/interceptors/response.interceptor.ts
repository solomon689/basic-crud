import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from '../interface/response.interface';
import { AddressEntity } from '../../modules/user/entities/address.entity';
import { SUCCESS, CREATED } from '../../config/exception-constants';
import { ForbiddenException } from '../exceptions/forbidden.exception';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle()
      .pipe(map( (data) => {
        let count: number = 1;

        if (data) {
          const statusCode: number = context.switchToHttp().getResponse().statusCode;
      
          if (statusCode === HttpStatus.OK) {
            return {
              status: SUCCESS,
              response: {
                count: (Array.isArray(data)) ? data.length : count,
                data
              }
            }
          }

          if (statusCode === HttpStatus.CREATED) {
            return {
              status: CREATED,
              response: {
                count: (Array.isArray(data)) ? data.length : count,
                data
              }
            }
          }
            
        } else {
          throw new ForbiddenException();
        }
      }));
  }
}
