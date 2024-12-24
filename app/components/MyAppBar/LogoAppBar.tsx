import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StyledLogoContainer, StyledTypography } from './styles';
import MyDrawer from '../MyDrawer/MyDrawer';
import { ICategory, ISubCategoryWithPath } from '@/types/products.types';
import logo from '@/app/icons/logo.svg';

interface Props {
  categories: ICategory[];
  subcategories: ISubCategoryWithPath[];
}

const LogoAppBar = ({ categories, subcategories }: Props) => {
  const router = useRouter();

  return (
    <StyledLogoContainer>
      <MyDrawer
        categories={categories}
        subcategories={subcategories}
        homePage={false}
      />

      <StyledTypography component="div" onClick={() => router.push('/')}>
        <Image src={logo} alt="KITSUNE logo" width={40} height={40} priority />
        KITSUNE
      </StyledTypography>
    </StyledLogoContainer>
  );
};

export default LogoAppBar;
