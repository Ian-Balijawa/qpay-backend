import { BadRequestError, NotFoundError } from '../../errors'
import express, { Request, Response } from 'express'

import { InternalServerError } from '../../errors/internal-server-error'
import { User } from '../../models/User'
import crypto from 'crypto'
import { requireAuth } from '../../middlewares/require-auth'

const router = express.Router()

router.post('/', requireAuth, async (req: Request, res: Response) => {
	const { payload: cipherText } = req.body
	const { _id } = req.body

	if (!cipherText) {
		const error = new BadRequestError('Must provide valid plain text data to be encrypted')

		return res.send(error.serializeErrors()).status(error.statusCode)
	}
	const user = await User.findOne({ _id })

	if (!user) {
		const error = new BadRequestError('No such Key')
		return res.status(error.statusCode).send(error.serializeErrors())
	}
	try {
		const plainText = crypto.privateDecrypt(
			{
				key: Buffer.from(user?.privateKey!),
				padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
				oaepHash: 'sha512',
				passphrase: process.env.PASS_PHRASE!,
			},
			Buffer.from(cipherText, 'base64')
		)
		const obj = JSON.parse(plainText.toString('utf8'))
		const { reciever: recieverID, amount } = obj

		const recipient = await User.findOne({ _id: recieverID })
		const senderInfo = await User.findOne({ _id: '634913fa0bae7b980f9df924' })
		console.log('req.user?.id: ', req.user?.id)
		if (!senderInfo) {
			const error = new NotFoundError('No such user found with given sender details')
			return res.status(error.statusCode).send(error.serializeErrors())
		}
		if (!recieverID) {
			const error = new BadRequestError('Invalid reciever Details')
			return res.status(error.statusCode).send(error.serializeErrors())
		}

		if (!recieverID) {
			const error = new NotFoundError('No such user found with given reciever details')
			return res.status(error.statusCode).send(error.serializeErrors())
		}
		if (senderInfo.amount < amount) {
			const error = new BadRequestError('Insufficient Funds')

			return res.status(error.statusCode).send(error.serializeErrors())
		}
		if (recipient && senderInfo) {
			recipient.amount += amount
			senderInfo.amount -= amount

			await recipient.save()
			await senderInfo.save()
		}
		return res.status(200).send('Recieved')
	} catch (error) {
		return res.status(500).send(new InternalServerError('Error During Decryption').serializeErrors())
	}
})
export { router as decryptionRouter }
