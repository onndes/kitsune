import logo from '@/assets/img/logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StyledLogoContainer, StyledTypography } from './styles';

const LogoAppBar = () => {
  const router = useRouter();

  return (
    <StyledLogoContainer>
      <StyledTypography component="div" onClick={() => router.push('/')}>
        <Image src={logo} alt="KITSUNE logo" width={40} height={40} priority />
        KITSUNE
      </StyledTypography>
    </StyledLogoContainer>
  );
};

export default LogoAppBar;
