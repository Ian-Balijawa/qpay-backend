import { NextFunction, Request, Response } from 'express'

import { CustomError } from '../errors/custom-error'

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
	if (err instanceof CustomError) {
		next(err.serializeErrors())
	} else {
		return res.status(500).send({
			errors: {
				message: 'Something went terribly wrong.',
			},
		})
	}
}
