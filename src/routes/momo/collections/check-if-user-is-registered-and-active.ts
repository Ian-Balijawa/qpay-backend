import { Request, Response, Router } from 'express'
import axios, { AxiosRequestConfig } from 'axios'

import { requireAuth } from '../../../middlewares/require-auth'

const router = Router()

router.get('/', requireAuth, async (req: Request, res: Response) => {
	const config: AxiosRequestConfig<any> = {
		method: 'get',
		url: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/accountholder/msisdn/0243656543/active',
		headers: {
			'X-Target-Environment': 'sandbox',
			'Ocp-Apim-Subscription-Key': 'f4f2da18c0db4033b897644dc8ef1fec',
			Authorization:
				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImVlMDEyOGE2LTk2MjUtNDA0OS04MTlhLWRkMzRmNTBiZmVjMCIsImV4cGlyZXMiOiIyMDE5LTExLTIxVDAwOjU4OjI4LjEzNiIsInNlc3Npb25JZCI6IjUxNzlhMmM2LTM5ZmYtNGEyYS1hYjlmLTgxMTc5ZDlkYzgxYyJ9.NSSbFcW6l-1yifgYL5eWM0ALyls6ncdNvfqu4iVDrssMvRpQ3LKF2Zl7t2r3kcF07J23ulPdP66ZuK4-dDxdk1OoOsOaIq_-nFpT94joIYGcNFZ1xcsBRIe7PMzZDU9Ln1Njc6NBVY6knV-wMUYzcW0j7kqX9Knov5nX5TmeSdcYUsSa1t4JkHWk5Ok8nQcJqYrw8DlPALV1FxyMIhLhk3SeTVNTigeR0wIbUBYbjoK0ezF9fY0SLNvwfcI97AO2tY8thSVO0GDWw9FY1Y-Xx-398La5FgHGYOV8Ra7Cd0r5PiPi2e88hLfaF6WYgVZpUeKsD9G53twzFYXeZYLBJg',
		},
	}

	axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data))
			return res.status(200).send(response.data)
		})
		.catch(function (error) {
			console.log(error)

			return res.status(400).send(error)
		})
})

export { router as checkIfUserIsRegisteredAndActiveRouter }
