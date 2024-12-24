import WrapperProducts from './WrapperProducts';

export default async function ProductsPage() {
  try {
    return <WrapperProducts />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Failed to load products</div>;
  }
}
