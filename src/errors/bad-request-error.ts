import { CustomError, ErrorField } from './custom-error';

export class BadRequestError extends CustomError {
    statusCode = 400;
    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors(): ErrorField {
        return { message: this.message, }
    }
}
