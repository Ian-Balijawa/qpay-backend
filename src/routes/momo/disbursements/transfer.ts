import { Request, Response, Router } from 'express'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
const router = Router()

router.post('/', async (_req: Request, _res: Response) => {
	const data = JSON.stringify({
		amount: '1000.0',
		currency: 'UGX',
		externalId: '15234353',
		payee: {
			partyIdType: 'MSISDN',
			partyId: '0245565634',
		},
		payerMessage: 'June Salary',
		payeeNote: 'Any thing we want to type.',
	})

	const config: AxiosRequestConfig<any> = {
		method: 'post',
		url: 'https://sandbox.momodeveloper.mtn.com/disbursement/v1_0/transfer',
		headers: {
			'X-Reference-Id': '07c40d0b-ec98-449c-9de0-d14cc3e90ed8',
			'X-Target-Environment': 'sandbox',
			'Ocp-Apim-Subscription-Key': '98dded9b14af4ad68a778d93949284fc',
			'Content-Type': 'application/json',
			Authorization:
				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImVlMDEyOGE2LTk2MjUtNDA0OS04MTlhLWRkMzRmNTBiZmVjMCIsImV4cGlyZXMiOiIyMDE5LTExLTIxVDAwOjU4OjI4LjEzNiIsInNlc3Npb25JZCI6IjUxNzlhMmM2LTM5ZmYtNGEyYS1hYjlmLTgxMTc5ZDlkYzgxYyJ9.NSSbFcW6l-1yifgYL5eWM0ALyls6ncdNvfqu4iVDrssMvRpQ3LKF2Zl7t2r3kcF07J23ulPdP66ZuK4-dDxdk1OoOsOaIq_-nFpT94joIYGcNFZ1xcsBRIe7PMzZDU9Ln1Njc6NBVY6knV-wMUYzcW0j7kqX9Knov5nX5TmeSdcYUsSa1t4JkHWk5Ok8nQcJqYrw8DlPALV1FxyMIhLhk3SeTVNTigeR0wIbUBYbjoK0ezF9fY0SLNvwfcI97AO2tY8thSVO0GDWw9FY1Y-Xx-398La5FgHGYOV8Ra7Cd0r5PiPi2e88hLfaF6WYgVZpUeKsD9G53twzFYXeZYLBJg',
		},
		data,
	}

	axios(config)
		.then((response: AxiosResponse) => {
			console.log(JSON.stringify(response.data))
		})
		.catch((error: AxiosError) => {
			console.log(error)
		})
})

export { router as transferRouter }
