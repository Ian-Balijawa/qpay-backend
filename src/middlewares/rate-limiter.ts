import { RateLimitRequestHandler, rateLimit } from 'express-rate-limit'

import { __PROD__ } from '../config/__prod__'

const ONE_MINUTE = 1 * 60 * 1000
/**
 * HTTP request handlers should not perform expensive operations such as accessing the file system,
 * executing an operating system command or interacting with a database without limiting the rate at which requests are accepted.
 * Otherwise, the application becomes vulnerable to denial-of-service attacks where an attacker can cause the application
 * to crash or become unresponsive by issuing a large number of requests at the same time.
 */
const limiter: RateLimitRequestHandler = rateLimit({
	windowMs: ONE_MINUTE,
	max: __PROD__ ? 10 : Number.MAX_SAFE_INTEGER,
})

export { limiter }
