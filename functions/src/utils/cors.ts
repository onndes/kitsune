// utils/cors.ts
import type { Request, Response } from 'express';

/**
 * Обработка CORS для Cloud Functions (Express).
 */
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
