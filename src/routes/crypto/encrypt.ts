import express, { Request, Response } from 'express';

import { BadRequestError } from '../../errors';
import { InternalServerError } from '../../errors/internal-server-error';
import { User } from '../../models/User';
import crypto from 'crypto';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.post('/', requireAuth, async (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount) {
    const error = new BadRequestError(
      'Must provide valid plain text data to be encrypted'
    );
    return res.send(error.serializeErrors()).status(error.statusCode);
  }

  const user = await User.findOne({ phone: req.user?.phone });

  if (!user) {
    const error = new BadRequestError(
      'Need to be signed in to access this route'
    );
    return res.status(error.statusCode).send(error.serializeErrors());
  }
  try {
    const cipherText = crypto.publicEncrypt(
      {
        key: user?.publicKey!,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha512',
        passphrase: process.env.PASS_PHRASE!
      },
      Buffer.from(JSON.stringify(amount), 'utf8')
    );
    return res.status(200).send({
      cipherText: cipherText.toString('base64'),
      merchantID: req.user?.id
    });
  } catch (error) {
    console.error(`Error encrypting data : ${error}`);
  }

  return res
    .status(200)
    .send(new InternalServerError('Error encrypting data').serializeErrors());
});

export { router as encryptionRouter };
