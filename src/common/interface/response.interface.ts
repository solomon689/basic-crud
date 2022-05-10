import { Status } from './status.interface';

export interface Response<T> {
    status: Status;
    response: {
        count?: number;
        data: any
    }
}