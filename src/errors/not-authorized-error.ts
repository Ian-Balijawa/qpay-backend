import { CustomError, ErrorField } from './custom-error';

export class NotAuthorizedError extends CustomError {
	statusCode = 403;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}

	serializeErrors(): ErrorField {
		return { message: this.message };
	}
}
