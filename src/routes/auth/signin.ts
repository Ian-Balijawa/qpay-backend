import express, { Request, Response } from 'express'

import { BadRequestError } from '../../errors'
import { PasswordManager } from '../../services/password'
import { User } from '../../models/User'
import { body } from 'express-validator'
import { validateRequest } from '../../middlewares'

const router = express.Router()

router.post(
	'/',
	[body('phone').isMobilePhone('en-UG').withMessage('Phone must be valid'), body('password').notEmpty().withMessage('You must supply a password')],
	validateRequest,
	async (req: Request, res: Response): Promise<any> => {
		const { phone, password } = req.body

		const user = await User.findOne({ phone })

		if (!user) {
			const error = new BadRequestError('Invalid credentials')
			return res.status(error.statusCode).send(error.serializeErrors())
		}

		const passwordsDoMatch = await PasswordManager.compare(user.password, password)

		if (!passwordsDoMatch) {
			const error = new BadRequestError('Invalid credentials')
			return res.status(error.statusCode).send(error.serializeErrors())
		}

		const userJWT = User.createAuthToken(user)
		req.session.jwt = userJWT

		return res.status(200).send({ existingUser: user, authToken: userJWT })
	}
)

export { router as signinRouter }
