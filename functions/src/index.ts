import { onRequest } from 'firebase-functions/v2/https';
import { log } from 'firebase-functions/logger';

export const helloWorld = onRequest((req, res) => {
  log('Received request to helloWorld function');
  res.status(200).send('Hello from Firebase!');
});
