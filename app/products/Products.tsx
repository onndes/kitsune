'use client';

// import { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid2';
import ItemProduct from './components/ItemProducts';
import { IProduct } from '@/types/products.types';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/firebase/getProducts';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import {
  setInitialProducts,
  setLastDoc,
  setProducts,
} from '@/redux/productSlice';

interface Props {
  initialProducts: IProduct[];
  initialLastDoc: string | null;
  category?: string;
  subcategory?: string;
  handleNextProduct?: () => void;
}

export default function Products({
  initialProducts,
  initialLastDoc,
  category,
  subcategory,
}: Props) {
  // const [products, setProducts] = useState<IProduct[]>(initialProducts);
  // const [lastDoc, setLastDoc] = useState<string | null>(initialLastDoc);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lastDoc, products } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (initialProducts.length > 0 && !products.length) {
      dispatch(setInitialProducts(initialProducts));
    }
    if (initialLastDoc && !lastDoc) {
      dispatch(setLastDoc(initialLastDoc));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreProducts = async () => {
    if (!lastDoc || loading) return;

    const scrollYBeforeLoad = window.scrollY;
    setLoading(true);

    try {
      const { productsImgSplash, lastVisible } = await getProducts({
        limitNumber: 10,
        category,
        subcategory,
        lastDoc,
      });

      // Проверяем, если больше продуктов нет
      if (productsImgSplash.length === 0) {
        dispatch(setLastDoc(null)); // Останавливаем дозагрузку
      } else {
        dispatch(setProducts(productsImgSplash));
        dispatch(setLastDoc(lastVisible));
      }
      window.scrollTo({ top: scrollYBeforeLoad });
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ pt: 0, pb: 4 }}>
      <Grid container spacing={2} pb={4}>
        {products?.length === 0 && <Grid size={{ xs: 12 }}>Товарів немає</Grid>}
        {/* {isLoading && (
          <Grid size={{ xs: 12 }} minHeight="300px">
            <LinearLoader position="relative" />
          </Grid>a
        )} */}
        {products?.length > 0 &&
          products.map((product, index) => {
            return (
              <Grid
                size={{ xs: 12, sm: 6, tabletLandscape: 4, md: 4, lg: 3 }}
                // size={8}
                key={product.code}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1 1 auto',
                }}
              >
                <ItemProduct product={product} index={index} />
              </Grid>
            );
          })}
      </Grid>
      {products?.length > 0 && (
        <Box display="flex" justifyContent="center">
          <LoadingButton
            sx={{ height: '100%', fontWeight: 600 }}
            onClick={loadMoreProducts}
            type="submit"
            disabled={!lastDoc}
            variant="outlined"
            size="large"
            loading={loading}
          >
            Завантажити ще
          </LoadingButton>
        </Box>
      )}
    </Container>
  );
}
