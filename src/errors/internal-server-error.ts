import { CustomError, ErrorField } from './custom-error';

export class InternalServerError extends CustomError {
	statusCode = 403;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, InternalServerError.prototype);
	}

	serializeErrors(): ErrorField {
		return { message: this.message }
	}
}
