import { Status } from '../common/interface/status.interface';
import { HttpStatus } from '@nestjs/common';

export const SUCCESS: Status = {
    code: HttpStatus.OK,
    message: 'Exito',
    str: 'OK'
};

export const CREATED: Status = {
    code: HttpStatus.CREATED,
    message: 'Creado exitosamente',
    str: 'CREATED'
};

export const CONFLICT: Status = {
    code: HttpStatus.CONFLICT,
    message: 'Ha ocurrido un conflicto con el recurso actual',
    str: 'CONFLICT'
};

export const FORBIDDEN: Status = {
    code: HttpStatus.FORBIDDEN,
    message: 'No se ha podido procesar el recurso actual',
    str: 'FORBIDDEN'
};

export const BAD_REQUEST: Status = {
    code: HttpStatus.BAD_REQUEST,
    message: 'Error en el formato del recurso',
    str: 'BAD_REQUEST'
};

export const INTERNAL_SERVER_ERROR: Status = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Ha ocurrido un error interno',
    str: 'INTERNAL_SERVER_ERROR'
};

export const NOT_FOUND: Status = {
    code: HttpStatus.NOT_FOUND,
    message: 'No se ha logrado encontrar el recurso',
    str: 'NOT_FOUND'
};