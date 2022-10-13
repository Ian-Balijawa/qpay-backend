import { QPEY } from '../Interfaces/keys';
import { __PROD__ } from './__prod__';

let QPEY_KEYS: QPEY = {
	JWT_KEY: __PROD__ ? process.env.JWT_KEY : 'asdfasd',
	MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/qpey',
	REDIS_URI: __PROD__ ? process.env.REDIS_URI : 'asdfasd',
	SECRET_KEY: __PROD__ ? process.env.API_KEY : 'asdfasd',
	COOKIE_SECRET: __PROD__ ? process.env.COOKIE_SECRET : 'asdfasd',
	SERVER_PORT: __PROD__
		? (process.env.SERVER_PORT as unknown as number)
		: 4000,
};

export { QPEY_KEYS };

