import mongoose from 'mongoose';
import { app } from './app';
import { QPEY_KEYS, MOMO_KEYS } from './config/keys';
const { COLLECTIONS} = MOMO_KEYS;
const {
	SECRET_KEY,
	JWT_KEY,
	MONGO_URI,
	REDIS_URI,
	COOKIE_SECRET,
	SERVER_PORT,
} = QPEY_KEYS;

const start = async (): Promise<void> | never => {
	if (!COLLECTIONS?.PRI_KEY || !COLLECTIONS?.SEC_KEY) {
		console.error(
			'COLLECTIONS PRIMARY_KEY and SECONDARY_KEY Must be defined'
		);
		process.exit(1);
	}
	if (!JWT_KEY) {
		console.error('JWT_KEY must be defined!');
		process.exit(1);
	}
	if (!MONGO_URI) {
		console.error('MONGO_URI must be defined!');
		process.exit(1);
	}
	if (!REDIS_URI) {
		console.error('REDIS_URI must be defined!');
		process.exit(1);
	}
	if (!COOKIE_SECRET) {
		console.error('COOKIE_SECRET must be defined');
		process.exit(1);
	}
	if (!SECRET_KEY) {
		console.error('API_KEY must be defined');
		process.exit(1);
	}

	mongoose
		.connect(MONGO_URI)
		.then(() => console.log('Connected to Database!'))
		.catch(err => console.log(err));
};

start();

process.on('uncaughtException', err => {
	throw new Error((err as Error).message);
});
process.on('unhandledRejection', err => {
	throw new Error((err as Error).message);
});
process.on('uncaughtExceptionMonitor', err => {
	throw new Error((err as Error).message);
});

const PORT = process.env.PORT || SERVER_PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
