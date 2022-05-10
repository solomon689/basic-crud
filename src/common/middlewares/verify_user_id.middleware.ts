import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from "express";
import { UserService } from '../../modules/user/user.service';
import { UserDto } from '../../modules/user/dto/user.dto';
import { NOT_FOUND } from '../../config/exception-constants';

@Injectable()
export class VerifyUserIdMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService
    ) { }

    public async use(req: Request, res: Response, next: NextFunction) {
        const userId: string = req.params.id;
        const userFound: UserDto | null = await this.userService.findOne(userId);

        if (!userFound) {
            throw new HttpException({
                status: NOT_FOUND,
                response: { count: 0, data: null }
            }, HttpStatus.NOT_FOUND);
        }

        next();
    }
}   