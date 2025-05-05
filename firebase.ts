import { initializeApp, FirebaseApp } from 'firebase/app'; // Импортируем модуль Firebase
import { getAuth, Auth } from 'firebase/auth'; // Импортируем auth и тип Auth
import { getFirestore, Firestore } from 'firebase/firestore'; // Импортируем firestore и тип Firestore
import { Database, getDatabase } from 'firebase/database'; // Импортируем Realtime Database и тип Database

const config = JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG || '{}');

// Инициализация Firebase
const app: FirebaseApp = initializeApp(config); // Типизация для FirebaseApp

// Получение экземпляров сервисов
const auth: Auth = getAuth(app); // Типизация для auth
const db: Firestore = getFirestore(app); // Типизация для firestore

const database: Database = getDatabase(app); // Типизация для Realtime Database

export { app, auth, db, database }; // Экспортируем экземпляры
