import { Request, Response, Router } from 'express'
import { requireAuth, validateRequest } from '../middlewares'

import { BadRequestError } from './../errors/bad-request-error'
import { NotFoundError } from '../errors'
import { User } from '../models/User'
import mongoose from 'mongoose'
import { param } from 'express-validator'

const router = Router()

router.get('/:id', [param('id').notEmpty().withMessage('The ID param must be provided')], requireAuth, validateRequest, async (req: Request, res: Response) => {
	const { id } = req.params

	if (!mongoose.isValidObjectId(id)) {
		const error = new BadRequestError('Invalid objectId')
		return res.send(error.serializeErrors())
	}

	const user = await User.findOne({ _id: id })
	if (!user) {
		const error = new NotFoundError('No such User')
		return res.status(error.statusCode).send(error.serializeErrors())
	}
	const balance = user?.amount
	return res.send(`${balance}`)
})

export { router as balanceRouter }
