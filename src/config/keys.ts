import { __PROD__ } from './__prod__';
import { MOMO, QPEY } from '../Interfaces/keys';

let QPEY_KEYS: QPEY = {
	JWT_KEY: __PROD__ ? process.env.JWT_KEY : 'asdfasd',
	MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/qpey',
	REDIS_URI: __PROD__ ? process.env.REDIS_URI : 'asdfasd',
	SECRET_KEY: __PROD__ ? process.env.API_KEY : 'asdfasd',
	COOKIE_SECRET: __PROD__ ? process.env.COOKIE_SECRET : 'asdfasd',
	SERVER_PORT: __PROD__
		? (process.env.SERVER_PORT as unknown as number)
		: 4000,
	TWILIO_ACCOUNT_SID: __PROD__
		? process.env.TWILIO_ACCOUNT_SID
		: 'ACea1c5b232d2ff55565012eaffbc76adf',
	TWILIO_AUTH_TOKEN: __PROD__
		? process.env.TWILIO_AUTH_TOKEN
		: 'a43f5a278d96061678ab5eb119ea2091',
	TWILIO_PHONE_NO: __PROD__ ? process.env.TWILIO_PHONE_NO : '+16184238540',
};

let MOMO_KEYS: MOMO = {
	COLLECTIONS: {
		PRI_KEY: __PROD__
			? process.env.COLLECTIONS_PRIMARY_KEY
			: '62589072bde24d4ab92ccf414e961233',
		SEC_KEY: __PROD__
			? process.env.COLLECTIONS_SECONDARY_KEY
			: 'ba31a426393a481a86a60e7b325775f0',
	},
};

export { QPEY_KEYS, MOMO_KEYS };
