import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
	const config: AxiosRequestConfig<any> = {
		method: 'get',
		url: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/ee0128a6-9625-4049-819a-dd34f50bfec0',
		headers: {
			'Ocp-Apim-Subscription-Key': '98dded9b14af4ad68a778d93949284fc',
		},
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
