import express, { Request, Response } from 'express';

const router = express.Router()

router.post("/", async (req: Request, res: Response) => {
	console.log(req.body)
	return res.status(200).send("ok")
})

export { router as callbackRouter };
