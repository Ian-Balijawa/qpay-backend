import { __PROD__ } from './__prod__';

const QPEY_KEYS = {
	JWT_KEY: __PROD__ ? process.env.JWT_KEY : 'asdfasd',
	MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/qpey',
	REDIS_URI: __PROD__ ? process.env.REDIS_URI : 'asdfasd',
	SECRET_KEY: __PROD__ ? process.env.API_KEY : 'asdfasd',
	COOKIE_SECRET: __PROD__ ? process.env.COOKIE_SECRET : 'asdfasd',
	SERVER_PORT: __PROD__
		? (process.env.SERVER_PORT as unknown as number)
		: 4000,
	API_USER: "09cbc58c-1975-4d2d-86d8-d24963d9be0a",
	API_KEY: "5b02f6aa09e5a62087bf09cbf89b1886"
};

export { QPEY_KEYS };

