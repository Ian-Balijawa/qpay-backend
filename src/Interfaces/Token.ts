import { Types } from 'mongoose'

export interface IToken extends Object {
	id: Types.ObjectId
	expiresIn: number
}
