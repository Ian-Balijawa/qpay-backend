import { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';
import { requireAuth, validateRequest } from '../middlewares';

import { BadRequestError } from './../errors/bad-request-error';
import { NotFoundError } from '../errors';
import { User } from '../models/User';
import mongoose from 'mongoose';

const router = Router();

router.post(
  '/',
  [body('amount').notEmpty().withMessage('Amount is required')],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { amount } = req.body;

    const user = await User.findOne({ _id: req.user?.id });
    if (!user) {
      const error = new NotFoundError('No such User');
      return res.status(error.statusCode).send(error.serializeErrors());
    }
    user.amount += amount;
    await user.save();
    return res.send(`NEW AMOUNT: ${user.amount}`);
  }
);

export { router as depositRouter };
