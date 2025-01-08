import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StyledLogoContainer, StyledTypography } from './styles';
import MyDrawer from '../MyDrawer/MyDrawer';
import { ICategory, ISubCategoryWithPath } from '@/types/products.types';
import { useDispatch } from 'react-redux';
import { setActiveSubcategory, setOpenedSubmenu } from '@/redux/appSlice';

interface Props {
  categories: ICategory[];
  subcategories: ISubCategoryWithPath[];
}

const LogoAppBar = ({ categories, subcategories }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <StyledLogoContainer>
      <MyDrawer
        categories={categories}
        subcategories={subcategories}
        homePage={false}
      />

      <StyledTypography
        component="div"
        onClick={() => {
          router.push('/');
          dispatch(setActiveSubcategory(''));
          dispatch(setOpenedSubmenu(''));
        }}
      >
        <Image
          src="/image/logos/logo.svg"
          alt="KITSUNE logo"
          width={40}
          height={40}
          priority
        />
        KITSUNE
      </StyledTypography>
    </StyledLogoContainer>
  );
};

export default LogoAppBar;
