export const checkImageLoadServer = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' }); // Запрашиваем только заголовки
    return response.ok; // Если статус 200–299, изображение доступно
  } catch (error) {
    console.warn('Image load failed:', error);
    return false; // Возвращаем false при ошибке запроса
  }
};
