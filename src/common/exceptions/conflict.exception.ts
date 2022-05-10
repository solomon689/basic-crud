import { HttpException, HttpStatus } from '@nestjs/common';
import { CONFLICT } from '../../config/exception-constants';

export class ConflictException extends HttpException {
    constructor() {
        super({
            status: CONFLICT,
            reponse: { count: 0, data: null }
        }, HttpStatus.CONFLICT);
    }
}