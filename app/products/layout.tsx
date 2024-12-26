import { Container, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getCatsAndSubs } from '@/lib/firebase/getCategories';
import { extractCategoryPath } from '@/common/utils/extractCategoryPath';
import MyMenu from '@/app/components/Menu';

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { categories, subcategories } = await getCatsAndSubs();
  const extractedCategoryPath = extractCategoryPath(subcategories);

  return (
    <Container sx={{ pt: 2, height: '100%' }} disableGutters>
      <Grid
        container
        sx={{ height: '100%', minHeight: '100vh' }}
        gap={1}
        size={4}
      >
        <MyMenu
          homePage={false}
          categories={categories}
          subcategories={extractedCategoryPath}
          drawer={false}
        />
        <Grid
          size="grow"
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flex: 1 }}>{children}</Box>
        </Grid>
      </Grid>
    </Container>
  );
}
