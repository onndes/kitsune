import { Container, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getCatsAndSubs } from '@/api/categories/getCategories';
import { extractCategoryPath } from '@/utils/extractCategoryPath';
import MyMenu from '@/app/components/Menu';

export default async function HomePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { categories, subcategories } = await getCatsAndSubs();
  const extractedCategoryPath = extractCategoryPath(subcategories);

  return (
    <Container sx={{ pt: 0, height: '100%' }} disableGutters>
      <Grid
        container
        sx={{ height: '100%', minHeight: '100%' }}
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
