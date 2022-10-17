import express, { Request, Response } from 'express';

import { QPEY_KEYS } from "../config/keys";
import axios from 'axios';
const { API_USER, API_KEY } = QPEY_KEYS;

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
	const { amount, currency, msisdn, environment, reason, callback } = req.body;
	const url = 'https://wallet.ssentezo.com/api/withdraw';
	const { data } = await axios.post(url, { amount, currency, msisdn, environment, reason, callback }, {
		auth: {
			username: API_USER,
			password: API_KEY,
		}
	})

	return res.status(200).send(data);
});

export { router as withdrawRouter };

