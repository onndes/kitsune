import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ICity, INovaPoshtaResponse, IWarehouse } from '@/types/novaPoshta.t';
import { regionalCentersCity } from '@/app/cart/regionsCenters';

const API_KEY = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY as string;
const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';

// Общая функция для API-запросов
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

export const useCities = (
  query: string
): { cities: ICity[]; isLoading: boolean } => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await novaPoshtaRequest<ICity>(
          'Address',
          'getCities',
          {
            FindByString: query,
          }
        );
        setCities(response.data || []);
      } catch (error) {
        console.error('Ошибка получения городов:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchCities, 250); // Задержка запроса
    return () => clearTimeout(debounceFetch); // Очищаем таймер при изменении query
  }, [query]);

  return { cities, isLoading };
};

export const useWarehouses = (
  cityRef: string | null
): UseQueryResult<INovaPoshtaResponse<IWarehouse>> => {
  return useQuery({
    queryKey: ['warehouses', cityRef],
    queryFn: () =>
      novaPoshtaRequest<IWarehouse>('Address', 'getWarehouses', {
        CityRef: cityRef,
      }),
    enabled: !!cityRef, // Запрос активен только если передан CityRef
  });
};

// =============================

//? Функция для получения актуальных Ref городов
export const fetchCityRefs = async (): Promise<ICity[]> => {
  try {
    const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
      apiKey: API_KEY,
      modelName: 'Address',
      calledMethod: 'getCities',
      methodProperties: {},
    });

    const allCities = response.data.data;

    // Обновляем `Ref` для областных центров
    const updatedRegionalCenters: ICity[] = regionalCentersCity.map((city) => {
      const matchedCity = allCities.find(
        (apiCity: { Description: string }) =>
          apiCity.Description === city.Description
      );
      return matchedCity || [];
    });

    // console.log('Обновленный список городов:', updatedRegionalCenters);
    return updatedRegionalCenters;
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return [];
  }
};
