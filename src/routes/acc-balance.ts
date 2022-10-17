import express, { Request, Response } from 'express';

import { QPEY_KEYS } from "../config/keys";
import axios from 'axios';

const router = express.Router();

const { API_USER, API_KEY } = QPEY_KEYS

router.post("/", async (req: Request, res: Response) => {
	const { data } = await axios.post("https://wallet.ssentezo.com/api/acc_balance", {}, {
		auth: {
			username: API_USER,
			password: API_KEY,
		},
	})
	return res.status(200).send(data);
});

export { router as balanceRouter };
