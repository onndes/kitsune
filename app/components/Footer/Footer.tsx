'use client';

import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import logo from '@/app/icons/logo.svg';
import useResponsive from '@/hooks/useResponsive';
import useMyTheme from '@/hooks/useMyTheme';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Footer = () => {
  const { isTabletPortrait } = useResponsive();
  const router = useRouter();
  const { colors } = useMyTheme();

  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters={isTabletPortrait}
      sx={{ pt: 0, display: render ? 'block' : 'none' }}
      style={{ padding: 0 }}
    >
      <Box
        sx={{
          background: colors.primaryPink[600],
          p: isTabletPortrait ? 3 : 3,
          // borderRadius: isTabletPortrait ? 0 : '20px',
          pb: 10,
        }}
      >
        <Grid container spacing={4}>
          <Grid size={{ base: 12, tabletPortrait: 6 }}>
            <Typography
              color="white"
              variant="h5"
              component="div"
              fontWeight="700"
              sx={{
                flexGrow: 1,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                pb: 3,
              }}
              onClick={() => router.push('')}
            >
              <Image src={logo} alt="KITSUNE logo" width={40} height={40} />
              KITSUNE
            </Typography>
            <Typography variant="body2" color="white">
              Магазин косметики {`"kitsune"`} - ваш надійний помічник у догляді
              за шкірою, волоссям і нігтями. Ми пропонуємо широкий вибір
              косметичних брендів з різних країн світу, щоб задовольнити потреби
              кожного клієнта. У нашому магазині ви знайдете продукти, створені
              з урахуванням місцевих особливостей клімату та культури догляду за
              собою. Ми гарантуємо високу якість продукції та приємні ціни.
            </Typography>
          </Grid>
          <Grid size={{ base: 12, tabletPortrait: 6 }}>
            <Typography variant="h5" component="p" color="white" pb={2}>
              Наші контакти
            </Typography>
            <Typography variant="body2" component="p" color="white">
              <a
                href="tel:+380630550303"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                +380630550303
              </a>
            </Typography>
            <Typography variant="body2" component="p" color="white">
              <a
                href={`mailto:ellemod.ua@gmail.com`}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                ellemod.ua@gmail.com
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Footer;
