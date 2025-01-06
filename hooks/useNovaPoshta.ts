import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

// Типы данных для API-ответов
interface NovaPoshtaResponse<T> {
  success: boolean;
  data: T[];
  errors: string[];
  warnings: string[];
  info: Record<string, unknown>;
}

interface City {
  Ref: string;
  Description: string;
}

interface Warehouse {
  Ref: string;
  Description: string;
}

const API_KEY = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY as string;
const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';

// Общая функция для API-запросов
const novaPoshtaRequest = async <T>(
  modelName: string,
  calledMethod: string,
  methodProps: Record<string, unknown> = {}
): Promise<NovaPoshtaResponse<T>> => {
  const response = await axios.post(BASE_URL, {
    apiKey: API_KEY,
    modelName,
    calledMethod,
    methodProperties: methodProps,
  });
  return response.data;
};

export const useCities = (
  query: string
): { cities: City[]; isLoading: boolean } => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await novaPoshtaRequest<City>('Address', 'getCities', {
          FindByString: query,
        });
        setCities(response.data || []);
      } catch (error) {
        console.error('Ошибка получения городов:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchCities, 500); // Задержка запроса
    return () => clearTimeout(debounceFetch); // Очищаем таймер при изменении query
  }, [query]);

  return { cities, isLoading };
};

export const useWarehouses = (
  cityRef: string | null
): UseQueryResult<NovaPoshtaResponse<Warehouse>> => {
  return useQuery({
    queryKey: ['warehouses', cityRef],
    queryFn: () =>
      novaPoshtaRequest<Warehouse>('Address', 'getWarehouses', {
        CityRef: cityRef,
      }),
    enabled: !!cityRef, // Запрос активен только если передан CityRef
  });
};
