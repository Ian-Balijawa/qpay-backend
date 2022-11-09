import { BadRequestError, NotFoundError } from '../../errors';
import express, { Request, Response } from 'express';

import { InternalServerError } from '../../errors/internal-server-error';
import { User } from '../../models/User';
import crypto from 'crypto';
import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.post('/', requireAuth, async (req: Request, res: Response) => {
  const { cipherText, merchantID } = req.body;
  console.log('1');
  if (!cipherText) {
    const error = new BadRequestError(
      'Must provide valid plain text data to be encrypted'
    );
    console.log('2');

    return res.send(error.serializeErrors()).status(error.statusCode);
  }
  console.log('3');
  if (!merchantID) {
    const error = new BadRequestError('Must provide merchant _id: (_id) field');

    console.log('4');
    return res.send(error.serializeErrors()).status(error.statusCode);
  }
  const merchant = await User.findOne({ _id: merchantID });

  console.log('5');
  if (!merchant) {
    const error = new BadRequestError('No merchant with given Key');
    return res.status(error.statusCode).send(error.serializeErrors());
  }
  console.log('6');
  try {
    const plainText = crypto.privateDecrypt(
      {
        key: Buffer.from(merchant?.privateKey!),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha512',
        passphrase: process.env.PASS_PHRASE!
      },
      Buffer.from(cipherText, 'base64')
    );
    console.log('7');
    const obj = JSON.parse(plainText.toString('utf8'));
    let amount = obj;
    console.log('AMOUNT: ', amount);
    console.log('PLAINTEXT: ', plainText);
    console.log('OBJ: ', obj);
    amount = Number(amount);
    const customer = await User.findOne({ _id: req.user?.id });
    console.log('8');

    if (!customer) {
      const error = new NotFoundError(
        'No such user found with given sender details'
      );
      return res.status(error.statusCode).send(error.serializeErrors());
    }
    console.log('9');

    if (customer.amount < amount) {
      const error = new BadRequestError('Insufficient Funds');

      return res.status(error.statusCode).send(error.serializeErrors());
    }
    console.log('10');
    if (merchant && customer) {
      merchant.amount += amount;
      customer.amount -= amount;

      await merchant.save();
      await customer.save();
    }

    console.log('11');
    return res.status(200).send({
      message: 'Transaction Successful',
      amount,
      balance: customer.amount
    });

    // return res.status(200).send('Recieved');
  } catch (error) {
    console.log('ERROR: ', error);
    console.log('12');
    return res
      .status(500)
      .send(
        new InternalServerError('Error During Decryption').serializeErrors()
      );
  }
});
export { router as decryptionRouter };
