import { HttpException, HttpStatus } from '@nestjs/common';
import { FORBIDDEN } from '../../config/exception-constants';

export class ForbiddenException extends HttpException {
    constructor() {
        super({
            status: FORBIDDEN,
            response: {
                count: 0,
                data: null
            }
        }, HttpStatus.FORBIDDEN);
    }
}