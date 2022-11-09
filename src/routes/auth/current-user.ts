import express, { Request, Response } from 'express';

import { User } from '../../models/User';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get('/', requireAuth, async (req: Request, res: Response) => {
  const me = await User.findOne({ _id: req.user?.id });

  return res.status(200).send({ me });
});

export { router as currentUserRouter };
