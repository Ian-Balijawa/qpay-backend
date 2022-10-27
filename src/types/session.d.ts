declare module 'express-session' {
	interface SessionData {
		jwt?: string
	}
}

export {}
