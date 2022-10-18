import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import express, { Request, Response } from 'express'

import { requireAuth } from '../../../middlewares'

const router = express.Router()

router.post('/', requireAuth, async (req: Request, res: Response) => {
	const data = JSON.stringify({
		amount: '5.0',
		currency: 'UGX',
		externalId: '6353636',
		payer: {
			partyIdType: 'MSISDN',
			partyId: '0248888736',
		},
		payerMessage: 'Pay for product a',
		payeeNote: 'payer note',
	})

	const config: AxiosRequestConfig<any> = {
		method: 'post',
		url: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
		headers: {
			'X-Reference-Id': '15284da8-9169-448b-b1aa-d71080b9e6eb',
			'X-Target-Environment': 'sandbox',
			'Ocp-Apim-Subscription-Key': 'f4f2da18c0db4033b897644dc8ef1fec',
			'Content-Type': 'application/json',
			Authorization:
				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImVlMDEyOGE2LTk2MjUtNDA0OS04MTlhLWRkMzRmNTBiZmVjMCIsImV4cGlyZXMiOiIyMDE5LTExLTIxVDAwOjU4OjI4LjEzNiIsInNlc3Npb25JZCI6IjUxNzlhMmM2LTM5ZmYtNGEyYS1hYjlmLTgxMTc5ZDlkYzgxYyJ9.NSSbFcW6l-1yifgYL5eWM0ALyls6ncdNvfqu4iVDrssMvRpQ3LKF2Zl7t2r3kcF07J23ulPdP66ZuK4-dDxdk1OoOsOaIq_-nFpT94joIYGcNFZ1xcsBRIe7PMzZDU9Ln1Njc6NBVY6knV-wMUYzcW0j7kqX9Knov5nX5TmeSdcYUsSa1t4JkHWk5Ok8nQcJqYrw8DlPALV1FxyMIhLhk3SeTVNTigeR0wIbUBYbjoK0ezF9fY0SLNvwfcI97AO2tY8thSVO0GDWw9FY1Y-Xx-398La5FgHGYOV8Ra7Cd0r5PiPi2e88hLfaF6WYgVZpUeKsD9G53twzFYXeZYLBJg',
		},
		data,
	}

	axios(config)
		.then(function (response: AxiosResponse<any>) {
			console.log(JSON.stringify(response.data))
			return res.status(200).send(response.data)
		})
		.catch(function (error: AxiosError) {
			console.log(error)
			return res.status(400).send(error.message)
		})
})

export { router as requestToPayRouter }
