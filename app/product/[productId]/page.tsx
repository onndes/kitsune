'use client';

import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { productId } = useParams();

  return (
    <div>
      <h1>Product ID: {productId}</h1>
      <p>Details about product with ID {productId} will be displayed here.</p>
    </div>
  );
}
