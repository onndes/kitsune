// import { firestore } from '../firebase'

import ServerWrapperMyMenu from './components/Menu';

// import ThemeSensitiveComponent from '@/components/client/ThemeSensitiveComponent';
// import ThemeSwitcher from '@/components/client/ThemeSwitcher';

export default function idexPage({ product = {} }) {
  console.log(product);
  return (
    <div>
      <ServerWrapperMyMenu />
      {/* <ThemeSwitcher />
      <ThemeSensitiveComponent />
      sss */}
    </div>
  );
}
