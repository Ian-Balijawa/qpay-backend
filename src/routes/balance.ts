import { Request, Response, Router } from 'express';

import { NotFoundError } from '../errors';
import { User } from '../models/User';
import { requireAuth } from '../middlewares';

const router = Router();

router.get('/', requireAuth, async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.user?.id });
  if (!user) {
    const error = new NotFoundError('No such User');
    return res.status(error.statusCode).send(error.serializeErrors());
  }
  const balance = user?.amount;
  return res.send(`${balance}`);
});

export { router as balanceRouter };
