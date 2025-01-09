import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ICity, INovaPoshtaResponse, IWarehouse } from '@/types/novaPoshta.t';
import { useDebounce } from 'use-debounce';

const API_KEY = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY as string;
const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';

const novaPoshtaRequest = async <T>(
  modelName: string,
  calledMethod: string,
  methodProps: Record<string, unknown> = {}
): Promise<INovaPoshtaResponse<T>> => {
  const response = await axios.post(BASE_URL, {
    apiKey: API_KEY,
    modelName,
    calledMethod,
    methodProperties: methodProps,
  });
  return response.data;
};

export const useCities = ({
  query,
  initialPage = 1,
  limit = 1000,
}: {
  query: string;
  initialPage: number;
  limit: number;
}): {
  cities: ICity[];
  isLoading: boolean;
  loadMore: () => void;
  hasMore: boolean;
} => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery] = useDebounce(query, 250);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setCities([]);
      setPage(initialPage); // Сбрасываем страницу при новом поисковом запросе
      setHasMore(true);
      return;
    }

    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await novaPoshtaRequest<ICity>(
          'Address',
          'getCities',
          {
            FindByString: debouncedQuery,
            Warehouse: '1',
            Page: page,
            Limit: limit,
          }
        );
        const newCities = response.data || [];
        setCities((prevCities) =>
          page === initialPage ? newCities : [...prevCities, ...newCities]
        ); // Сбрасываем список на первой странице, иначе добавляем данные

        if (newCities.length < limit) {
          setHasMore(false); // Если данных меньше лимита, дальнейших страниц нет
        }
      } catch (error) {
        console.error('Помилка отримання даних:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, page]);
  const loadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return { cities, isLoading, loadMore, hasMore };
};

export const useWarehouses = (
  cityRef: string | null
): UseQueryResult<INovaPoshtaResponse<IWarehouse>> => {
  return useQuery({
    queryKey: ['warehouses', cityRef],
    queryFn: () =>
      novaPoshtaRequest<IWarehouse>('Address', 'getWarehouses', {
        CityRef: cityRef,
        TypeOfWarehouseRef: '841339c7-591a-42e2-8233-7a0a00f0ed6f',
      }),
    enabled: !!cityRef, // Запрос активен только если передан CityRef
  });
};

export const useCitiesAll = (): UseQueryResult<INovaPoshtaResponse<ICity>> => {
  return useQuery({
    queryKey: ['cityRefs', 'cityDescription'],
    queryFn: () => novaPoshtaRequest<ICity>('Address', 'getCities', {}),
  });
};

// data: [
//   {
//     Ref: '6f8c7162-4b72-4b0a-88e5-906948c6a92f',
//     Description: 'Поштове відділення з обмеження',
//     DescriptionRu: 'Parcel Shop',
//   },
//   {
//     Ref: '841339c7-591a-42e2-8233-7a0a00f0ed6f',
//     Description: 'Поштове(ий)',
//     DescriptionRu: 'Почтовое отделение',
//   },
//   {
//     Ref: '95dc212d-479c-4ffb-a8ab-8c1b9073d0bc',
//     Description: 'Поштомат ПриватБанку',
//     DescriptionRu: 'Почтомат приват банка',
//   },
//   {
//     Ref: '9a68df70-0267-42a8-bb5c-37f427e36ee4',
//     Description: 'Вантажне(ий)',
//     DescriptionRu: 'Грузовое отделение',
//   },
//   {
//     Ref: 'f9316480-5f2d-425d-bc2c-ac7cd29decf0',
//     Description: 'Поштомат',
//     DescriptionRu: 'Почтомат',
//   },
// ],
