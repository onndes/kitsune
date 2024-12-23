import Products from './Products';

export default async function ProductsPage() {
  try {
    return <Products />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Failed to load products</div>;
  }
}
