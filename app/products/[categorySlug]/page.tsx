'use client';

import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams(); // Получаем параметры из URL
  const { categorySlug } = params;

  return (
    <div>
      <h6>Category: {categorySlug}</h6>
      {/* Здесь можно добавить логику для загрузки данных категории */}
    </div>
  );
}
