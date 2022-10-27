import { NextFunction, Request, Response } from 'express'

import { BadRequestError } from '../errors'
import mongoose from 'mongoose'

const validateObjectID = (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params

	if (!mongoose.isValidObjectId(id)) {
		next(new BadRequestError('Invalid objectId').serializeErrors())
	}
	next()
}
export { validateObjectID }
