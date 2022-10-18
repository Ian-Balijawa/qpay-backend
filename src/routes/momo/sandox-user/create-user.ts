import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
	const data = JSON.stringify({
		providerCallbackHost: 'https://webhook.site/37b4b85e-8c15-4fe5-9076-b7de3071b85d',
	})

	const config: AxiosRequestConfig<any> = {
		method: 'post',
		url: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser',
		headers: {
			'X-Reference-Id': '85a99936-6cd0-47cd-a665-76149650687b',
			'Ocp-Apim-Subscription-Key': '62589072bde24d4ab92ccf414e961233',
			'Content-Type': 'application/json',
		},
		data,
	}

	axios(config)
		.then((response: AxiosResponse) => {
			console.log(JSON.stringify(response.data))
			return res.status(200).send(response.data)
		})
		.catch((error: AxiosError) => {
			console.log(error)
			return res.send(error.message)
		})
})

export { router as getCreatedUserRouter }
