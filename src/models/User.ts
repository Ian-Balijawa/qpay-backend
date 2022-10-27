import { IToken } from '../Interfaces/Token'
import { QPEY_KEYS } from '../config/keys'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

interface UserAttrs {
	name: string
	phone: number
	password: string
	publicKey: string
	privateKey: string
	amount: number
}

export interface UserDoc extends mongoose.Document {
	name: string
	phone: String
	password: string
	publicKey: string
	privateKey: string
	amount: number
}

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc
	createAuthToken(user: UserDoc): string
	verfiyAuthToken(token: string): Promise<jwt.VerifyErrors | IToken>
}

const userSchema = new mongoose.Schema<UserDoc>(
	{
		name: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			length: 50,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			default: 0,
		},
		publicKey: {
			type: String,
			required: true,
		},
		privateKey: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(_doc, ret): void {
				ret.id = ret._id
				delete ret._id
				delete ret.password
				delete ret.privateKey
				delete ret.__v
			},
		},
	}
)

userSchema.statics.build = (attrs: UserAttrs): UserDoc => {
	return new User(attrs)
}

userSchema.statics.createAuthToken = function (user: UserDoc): string {
	const userJWT = jwt.sign(
		{
			id: user.id,
			phone: user.phone,
		},
		QPEY_KEYS.JWT_KEY as jwt.Secret
	) as string

	return userJWT
}

userSchema.statics.verifyAuthToken = async (token: string): Promise<jwt.VerifyErrors | IToken> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, QPEY_KEYS.JWT_KEY as jwt.Secret, (err, payload) => {
			if (err) reject(err)

			resolve(payload as IToken)
		})
	})
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
