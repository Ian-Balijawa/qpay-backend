import { CustomError, ErrorField } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(): ErrorField {
        return { message: this.message }
    }
}
