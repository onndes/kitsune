import ThemeSensitiveComponent from '@/components/client/ThemeSensitiveComponent';
import ThemeSwitcher from '@/components/client/ThemeSwitcher';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function Products() {
  const code = '1039557';
  const docRef = doc(db, 'products', `${code}`);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());

  return (
    <div>
      <ThemeSwitcher />
      <ThemeSensitiveComponent />
      sss
    </div>
  );
}
