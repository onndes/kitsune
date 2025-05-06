// Минимальные типы, достаточные для CORS-логики
export interface CorsRequest {
  method?: string;
}

export interface CorsResponse {
  setHeader(name: string, value: string): void;
  status(code: number): { send(body?: unknown): void };
}

/**
 * Обработка CORS для Cloud Functions v2.
 * @returns true, если это был pre-flight OPTIONS и ответ уже отправлен.
 */
export function handleCors(
  req: CorsRequest,
  res: CorsResponse,
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
