import type { Request } from 'firebase-functions/v2/https';
import type { Response } from 'express';

export function handleCors(
  req: Request,
  res: Response,
  allowedOrigin = '*'
): boolean {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return true;
  }
  return false;
}
