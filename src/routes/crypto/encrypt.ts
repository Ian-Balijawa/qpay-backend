import express, { Response, Request } from 'express';
import { BadRequestError } from '../../errors';
import crypto from 'crypto';
import { AuthenticatedMiddleware as requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/User';
import { NotAuthorizedError } from '../../errors/not-authorized-error';
import { InternalServerError } from '../../errors/internal-server-error';

const router = express.Router();

router.post('/', requireAuth, async (req: Request, res: Response) => {
	const payload = JSON.stringify(req.body);

	if (!payload) {
		const error = new BadRequestError(
			'Must provide valid plain text data to be encrypted'
		);
		return res.send(error.serializeErrors()).status(error.statusCode);
	}

	const user = await User.findOne({ phone: req.currentUser?.phone });

	if (!user) {
		const error = new NotAuthorizedError(
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
			},
			Buffer.from(payload, 'utf8')
		);
		return res.status(200).send(cipherText.toString('base64'));
	} catch (error) {
		console.error(`Error encrypting data : ${error}`);
	}

	return res
		.status(200)
		.send(
			new InternalServerError('Error encrypting data').serializeErrors()
		);
});

export { router as encryptionRouter };
