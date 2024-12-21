import Link from 'next/link';

export default function Products() {
  const categories = [
    { slug: 'electronics', name: 'Electronics' },
    { slug: 'furniture', name: 'Furniture' },
    { slug: 'clothing', name: 'Clothing' },
  ];

  return (
    <div>
      <h1>Products</h1>
      <p>Explore our wide range of products by category:</p>
      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/products/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
