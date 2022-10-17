import 'dotenv/config';
import "express-async-errors";

import express, { Express, Request, Response } from 'express';

import { NotFoundError } from './errors';
import { balanceRouter } from './routes/acc-balance';
import { callbackRouter } from './routes/callback';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { currentUserRouter } from './routes/auth/current-user';
import { decryptionRouter } from './routes/crypto/decrypt';
import { encryptionRouter } from './routes/crypto/encrypt';
import { errorHandler } from './middlewares/error-handler';
import helmet from 'helmet';
import morgan from 'morgan';
import { pingRouter } from './routes/home';
import { limiter as rateLimiter } from './middlewares';
import { signinRouter } from './routes/auth/signin';
import { signoutRouter } from './routes/auth/signout';
import { signupRouter } from './routes/auth/signup';
import { withdrawRouter } from './routes/withdraw';

const app: Express = express();

const apiPrefix = '/api/v1';

app.use(rateLimiter);
app.set('trust proxy', true);
app.disable('X-Powered-By');
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(
	cookieSession({
		secure: process.env.NODE_ENV === 'production',
		secret: process.env.COOKIE_SERCRET!,
		keys: [process.env.COOKIE_KEY!],
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${apiPrefix}/auth/signup`, signupRouter);
app.use(`${apiPrefix}/auth/signin`, signinRouter);
app.use(`${apiPrefix}/auth/current-user`, currentUserRouter);
app.use(`${apiPrefix}/auth/signout`, signoutRouter);
app.use(`${apiPrefix}/encrypt`, encryptionRouter);
app.use(`${apiPrefix}/decrypt`, decryptionRouter);
app.use(`${apiPrefix}/withdraw`, withdrawRouter);
app.use(`${apiPrefix}/balance`, balanceRouter);
app.use(`${apiPrefix}/callback`, callbackRouter);
app.use(`${apiPrefix}/ping`, pingRouter);

app.all('*', async (req: Request, res: Response) => {
	const error = new NotFoundError('Route to resource not Found');
	return res.status(error.statusCode).send(error.serializeErrors());
});

app.use(errorHandler);
export { app };

