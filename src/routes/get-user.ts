import express, { Request, Response } from 'express';

import { NotFoundError } from '../errors';
import { User } from '../models/User';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/', requireAuth, async (req: Request, res: Response) => {
  const me = await User.findOne({ _id: req.user?.id });

  if (!me) {
    const error = new NotFoundError('No such user found with given details');
    return res.status(error.statusCode).send(error.serializeErrors());
  }
  return res.status(200).send(me);
});

export { router as userRouter };
