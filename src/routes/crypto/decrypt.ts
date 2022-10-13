import express, { Request, Response } from 'express';

import { BadRequestError } from '../../errors';
import { InternalServerError } from '../../errors/internal-server-error';
import { User } from '../../models/User';
import crypto from 'crypto';
import { AuthenticatedMiddleware as requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.post(
	'/',
	requireAuth,
	async (req: Request, res: Response) => {
		const { payload: cipherText } = req.body;
		const { _id } = req.body;


		if (!cipherText) {
			const error = new BadRequestError(
				'Must provide valid plain text data to be encrypted'
			);

			return res.send(error.serializeErrors()).status(error.statusCode);
		}
		const user = await User.findOne({ _id });

		console.log(user)

		if (!user) {
			const error = new BadRequestError(
				'No such Key'
			);
			return res.status(error.statusCode).send(error.serializeErrors());
		}
		let plainText;
		try {
			plainText = crypto.privateDecrypt(
				{
					key: Buffer.from(user?.privateKey!),
					padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
					oaepHash: 'sha512',
					passphrase: process.env.PASS_PHRASE!,
				},
				Buffer.from(cipherText, 'base64')
			);
			return res
				.status(200)
				.send(JSON.parse(plainText?.toString('utf8')));
		} catch (error) {
			console.error(`Error during decryption: ${error}`);
		}

		return res
			.status(200)
			.send(
				new InternalServerError(
					'Error During Decryption'
				).serializeErrors()
			);
	}
);

export { router as decryptionRouter };

