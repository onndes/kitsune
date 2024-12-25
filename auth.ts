import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from './firebase';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('User signed in:', user);
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
};
