import { Request, Response, Router } from 'express'

import { requireAuth } from '../../middlewares'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

router.get('/', requireAuth, async (req: Request, res: Response) => {
	const uuid = uuidv4()

	res.status(200).send(uuid)
})

export { router as uuidRouter }
