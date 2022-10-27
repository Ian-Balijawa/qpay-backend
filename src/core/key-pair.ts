import { CIPHER } from './constants';
import { generateKeyPair } from 'crypto';
import { promisify } from 'util';

const generateKeyPairAsync = promisify(generateKeyPair);

type PublicKey = string;
type PrivateKey = string;

export const generateKeyPairRSA = async (): Promise<
	[PublicKey, PrivateKey]
> => {
	const { privateKey, publicKey } = await generateKeyPairAsync('rsa', {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: 'pkcs1',
			format: 'pem',
		},
		privateKeyEncoding: {
			type: 'pkcs1',
			format: 'pem',
			cipher: CIPHER,
			passphrase: process.env.PASS_PHRASE!,
		},
	});

	return [publicKey, privateKey];
};
