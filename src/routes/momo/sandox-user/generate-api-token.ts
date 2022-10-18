import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
	const config: AxiosRequestConfig<any> = {
		method: 'post',
		url: 'https://sandbox.momodeveloper.mtn.com/collection/token/',
		headers: {
			'Ocp-Apim-Subscription-Key': 'f4f2da18c0db4033b897644dc8ef1fec',
			Authorization: 'Basic ZWUwMTI4YTYtOTYyNS00MDQ5LTgxOWEtZGQzNGY1MGJmZWMwOjE5NDBkY2JmNjRkMjQyZGM5YWM3NjhkNGE4ZjM0OWYx',
		},
	}

	axios(config)
		.then((response: AxiosResponse) => {
			console.log(JSON.stringify(response.data))
			res.status(200).send(response.data)
		})
		.catch(function (error: AxiosError) {
			console.log(error)
			return res.send(error.message)
		})
})

export { router as generateApiTokenRouter }
