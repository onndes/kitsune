export interface TelegramResponse<T> {
  ok: boolean;
  result: T;
}

export interface TelegramPhoto {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  width: number;
  height: number;
}

export interface TelegramDocument {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  file_name: string;
  mime_type: string;
}

export interface TelegramMessage {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username?: string;
  };
  chat: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    type: 'private' | 'group' | 'supergroup' | 'channel';
  };
  date: number;
  text?: string;
  photo?: TelegramPhoto[];
  document?: TelegramDocument;
}
