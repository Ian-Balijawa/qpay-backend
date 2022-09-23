import express, { Response, Request } from 'express';
import { BadRequestError } from '../../errors';
import { AuthenticatedMiddleware as requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/User';
import crypto from 'crypto';
import { currentUserRouter } from '../auth/current-user';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { CustomError } from '../../errors/custom-error';
import { InternalServerError } from '../../errors/internal-server-error';

const router = express.Router();

router.post(
	'/',
	requireAuth,
	currentUserRouter,
	async (req: Request, res: Response) => {
		const { payload: cipherText } = req.body;
		const {publicKey} = req.body;

		if (!cipherText) {
			const error = new BadRequestError(
				'Must provide valid plain text data to be encrypted'
			);

			return res.send(error.serializeErrors()).status(error.statusCode);
		}
		const user = await User.findOne({publicKey:publicKey});

		if (!user) {
			const error = new NotAuthorizedError(
				'Not authorised. Need to sign in to access this route'
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
