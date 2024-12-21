'use client';
import { useParams } from 'next/navigation';

export default function SubcategoryPage() {
  const params = useParams();
  const { categorySlug, subcategorySlug } = params;

  return (
    <div>
      <h1>
        Category: {categorySlug} - Subcategory: {subcategorySlug}
      </h1>
    </div>
  );
}
