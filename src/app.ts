import 'dotenv/config';
import 'express-async-errors';

import express, { Express, Request, Response } from 'express';

import { NotFoundError } from './errors';
import { accountBalanceRouter } from './routes/momo/collections/account-balance';
import { balanceRouter } from './routes/balance';
import { checkIfUserIsRegisteredAndActiveRouter } from './routes/momo/collections/check-if-user-is-registered-and-active';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { currentUserRouter } from './routes/auth/current-user';
import { decryptionRouter } from './routes/crypto/decrypt';
import { depositRouter } from './routes/deposit';
import { encryptionRouter } from './routes/crypto/encrypt';
import { errorHandler } from './middlewares/error-handler';
import { getRequestToPayTransactionStatusRouter } from './routes/momo/collections/get-request-to-pay-transaction-status';
import helmet from 'helmet';
import morgan from 'morgan';
import { pingRouter } from './routes/ping';
import { limiter as rateLimiter } from './middlewares';
import { requestToPayRouter } from './routes/momo/collections/request-to-pay';
import { signinRouter } from './routes/auth/signin';
import { signoutRouter } from './routes/auth/signout';
import { signupRouter } from './routes/auth/signup';
import { uuidRouter } from './routes/momo/uuid';
import { withdrawRouter } from './routes/withdraw';

const app: Express = express();

const apiPrefixEndPoint = '/api/v1';

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
    keys: [process.env.COOKIE_KEY!]
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${apiPrefixEndPoint}/auth/signup`, signupRouter);
app.use(`${apiPrefixEndPoint}/auth/signin`, signinRouter);
app.use(`${apiPrefixEndPoint}/auth/current-user`, currentUserRouter);
app.use(`${apiPrefixEndPoint}/auth/signout`, signoutRouter);
app.use(`${apiPrefixEndPoint}/encrypt`, encryptionRouter);
app.use(`${apiPrefixEndPoint}/decrypt`, decryptionRouter);
app.use(`${apiPrefixEndPoint}/ping`, pingRouter);
app.use(`${apiPrefixEndPoint}/uuid`, uuidRouter);
app.use(`${apiPrefixEndPoint}/request-to-pay`, requestToPayRouter);
app.use(`${apiPrefixEndPoint}/account-balance`, accountBalanceRouter);
app.use(
  `${apiPrefixEndPoint}/get-request-to-pay-transaction-status`,
  getRequestToPayTransactionStatusRouter
);
app.use(
  `${apiPrefixEndPoint}/check-if-user-is-registered-and-active`,
  checkIfUserIsRegisteredAndActiveRouter
);
app.use(`${apiPrefixEndPoint}/balance`, balanceRouter);
app.use(`${apiPrefixEndPoint}/deposit`, depositRouter);
app.use(`${apiPrefixEndPoint}/withdraw`, withdrawRouter);

app.all('*', async (req: Request, res: Response) => {
  const error = new NotFoundError('Route to resource not Found');
  return res.status(error.statusCode).send(error.serializeErrors());
});

app.use(errorHandler);
export { app };
