// import { firestore } from '../firebase'

import ThemeSensitiveComponent from './components/ThemeSensitiveComponent';
import ThemeSwitcher from './components/ThemeSwitcher';

// export async function getServerSideProps(context) {
//   const items = []
//   const querySnapshot = await firestore
//     .collection('items')
//     .get()
//   querySnapshot.forEach((doc) => {
//     items.push({ id: doc.id, ...doc.data() })
//   })

//   return {
//     props: { items }, // will be passed to the page component as props
//   }
// }

export default function idexPage() {
  return (
    <div>
      <ThemeSwitcher />
      <ThemeSensitiveComponent />
      sss
    </div>
  );
  //   <div>
  //   {items.map((item) => (
  //     <p key={item.id}>{item.name}</p>
  //   ))}
  //   </div>
}
