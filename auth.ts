import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from './firebase'; // Импортируем инициализацию Firebase

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider(); // Создаём провайдер для Google

  try {
    // Получаем auth из инициализированного приложения
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider); // Выполняем вход через popup
    const user = result.user; // Получаем пользователя из результата
    console.log('User signed in:', user);

    // Логика после успешного входа
  } catch (error) {
    // Обработка ошибок
    console.error('Error during sign-in:', error);
  }
};
