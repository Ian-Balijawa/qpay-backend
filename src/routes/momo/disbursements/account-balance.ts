import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
	const config: AxiosRequestConfig<any> = {
		method: 'get',
		url: 'https://sandbox.momodeveloper.mtn.com/disbursement/v1_0/account/balance',
		headers: {
			'Ocp-Apim-Subscription-Key': '98dded9b14af4ad68a778d93949284fc',
			'X-Target-Environment': 'sandbox',
			Authorization:
				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImVlMDEyOGE2LTk2MjUtNDA0OS04MTlhLWRkMzRmNTBiZmVjMCIsImV4cGlyZXMiOiIyMDE5LTExLTIxVDAwOjU4OjI4LjEzNiIsInNlc3Npb25JZCI6IjUxNzlhMmM2LTM5ZmYtNGEyYS1hYjlmLTgxMTc5ZDlkYzgxYyJ9.NSSbFcW6l-1yifgYL5eWM0ALyls6ncdNvfqu4iVDrssMvRpQ3LKF2Zl7t2r3kcF07J23ulPdP66ZuK4-dDxdk1OoOsOaIq_-nFpT94joIYGcNFZ1xcsBRIe7PMzZDU9Ln1Njc6NBVY6knV-wMUYzcW0j7kqX9Knov5nX5TmeSdcYUsSa1t4JkHWk5Ok8nQcJqYrw8DlPALV1FxyMIhLhk3SeTVNTigeR0wIbUBYbjoK0ezF9fY0SLNvwfcI97AO2tY8thSVO0GDWw9FY1Y-Xx-398La5FgHGYOV8Ra7Cd0r5PiPi2e88hLfaF6WYgVZpUeKsD9G53twzFYXeZYLBJg',
		},
	}

	axios(config)
		.then((response: AxiosResponse) => {
			console.log(JSON.stringify(response.data))
		})
		.catch((error: AxiosError) => {
			console.log(error)
		})
})

export { router as accountBalanceRouter }
