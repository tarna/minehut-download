import { config as dotenv } from 'dotenv';
dotenv();

export const config = {
	token: process.env.TOKEN,
	sessionId: process.env.SESSION_ID,
	slgUserToken: process.env.SLG_USER_TOKEN,
};

export const body = {
	headers: {
		accept: 'application/json, text/plain, */*',
		'User-Agent': 'minehut-download',
		authorization: `Bearer ${config.token}`,
		'x-session-id': config.sessionId,
		'x-profile-id': config.slgUserToken,
	}
}