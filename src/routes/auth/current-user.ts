import express, { Request, Response } from 'express'

import { requireAuth } from '../../middlewares/require-auth'

const router = express.Router()

router.get('/', requireAuth, (req: Request, res: Response) => {
	return res.status(200).send(req.user || null)
})

export { router as currentUserRouter }
