'use client';
import { useParams } from 'next/navigation';

export default function SubcategoryPage() {
  const params = useParams();
  const { categorySlug, subcategorySlug } = params as {
    categorySlug: string;
    subcategorySlug: string;
  };

  return (
    <div>
      <h6>
        Category: {decodeURIComponent(categorySlug)} - Subcategory:
        {decodeURIComponent(subcategorySlug)}
      </h6>
    </div>
  );
}
