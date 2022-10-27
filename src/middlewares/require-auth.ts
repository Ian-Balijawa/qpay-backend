import { NextFunction, Request, Response } from 'express'

import { BadRequestError } from '../errors'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../services/token'

export interface UserPayload {
	id: string
	phone: string
}

declare global {
	namespace Express {
		interface Request {
			user?: UserPayload
		}
	}
}
declare module 'express-session' {
	interface SessionData {
		jwt?: string
	}
}

async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<Response | void> {
	const bearer = req.headers.authorization

	if (!bearer || !bearer.startsWith('Bearer ')) {
		return next(new BadRequestError('Unauthorised!!!'))
	}

	const accessToken: string = bearer.split('Bearer ')[1].trim()
	try {
		const payload: UserPayload | jwt.JsonWebTokenError = (await verifyToken(accessToken)) as unknown as UserPayload

		if (payload instanceof jwt.JsonWebTokenError) {
			next(new BadRequestError('Unauthorised. Missing or invalid AuthToken').serializeErrors())
		}

		if (!payload) {
			next(new BadRequestError('Unauthorised. Missing or invalid AuthToken').serializeErrors())
		}

		req.user = payload

		next()
	} catch (error) {
		next(new BadRequestError('Unauthorised!'))
	}
}

export { requireAuth }
