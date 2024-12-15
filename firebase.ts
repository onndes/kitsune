import { initializeApp } from 'firebase/app' // Импортируем модуль Firebase
import { getAuth } from 'firebase/auth' // Импортируем только auth
import { getFirestore } from 'firebase/firestore' // Импортируем только firestore
import firebaseConfig from './firebaseConfig'

// Инициализация Firebase
const app = initializeApp(firebaseConfig)

// Получение экземпляров сервисов
export const auth = getAuth(app) // Получаем auth
export const firestore = getFirestore(app) // Получаем firestore
export { app }
