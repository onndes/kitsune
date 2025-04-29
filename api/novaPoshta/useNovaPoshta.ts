import axios from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  INovaPoshtaApiResponse,
  IWarehouse,
  useCitiesProps,
  useWarehousesProps,
  TUseWarehousesResult,
  TUseCitiesResult,
  ICityPage,
} from '@/api/novaPoshta/novaPoshta.types';
const novaPoshtaRequest = async <T>(
  modelName: string,
  calledMethod: string,
  methodProps: Record<string, unknown> = {}
): Promise<INovaPoshtaApiResponse<T>> => {
  const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
    modelName,
    calledMethod,
    methodProperties: methodProps,
  });
  return response.data;
};

export const useCities = ({
  query,
  initialPage = 1,
  limit = 50,
}: useCitiesProps): TUseCitiesResult => {
  return useInfiniteQuery<INovaPoshtaApiResponse<ICityPage>, Error>({
    queryKey: ['cities', query],
    queryFn: async ({ pageParam = initialPage }) => {
      try {
        const response = await novaPoshtaRequest<ICityPage>(
          'Address',
          'searchSettlements',
          {
            CityName: query,
            Page: pageParam,
            Limit: limit,
          }
        );
        // todo: отобразить ошибку в интерфейсе
        // Если API вернул ошибку, выбросим её
        if (!response.success) {
          throw new Error(
            'Помилка при отриманні даних з Нової Пошти. Спробуйте пізніше. Можливо ви ввели невірні дані.'
          );
        }

        return response;
      } catch (error) {
        // Локальная обработка ошибки запроса
        console.error('Ошибка при выполнении запроса в useCities:', error);
        throw error; // Пробрасываем ошибку в TanStack Query
      }
    },
    retry: 2, // 🔁 Ограничение количества попыток
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
    initialPageParam: initialPage,
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage?.data[0].Addresses.length === limit;
      const nextPage = allPages.length + 1;
      return hasMore ? nextPage : undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.map((cityPage) => ({
            ...cityPage,
            Addresses: cityPage?.Addresses.map((address) => ({
              ...address,
              Description: address?.Present,
            })),
          })),
        })),
      };
    },
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000, // Данные хранятся 24
  });
};

// todo: поиск отделений перевести в оффлайн, сохранять куда-то в базу так просит НП
export const useWarehouses = ({
  cityRef,
  findByString,
  limit = 40,
}: useWarehousesProps): TUseWarehousesResult => {
  const isCityRefNumberFormat =
    findByString && /^\d+$/.test(findByString.trim());
  const searchMethodProperty = isCityRefNumberFormat
    ? 'WarehouseId'
    : 'FindByString';
  return useInfiniteQuery<INovaPoshtaApiResponse<IWarehouse>, Error>({
    queryKey: ['warehouses', cityRef, findByString],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await novaPoshtaRequest<IWarehouse>(
        'Address',
        'getWarehouses',
        {
          SettlementRef: cityRef,
          Limit: limit,
          // WarehouseId по номеру отделения или findByString по всему названию (номер, улица, и т.д.)
          [searchMethodProperty]: `${findByString}`.trim(),
          Page: pageParam,
        }
      );
      return res;
    },
    initialPageParam: 1,
    enabled: !!cityRef,
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage?.data?.length === limit;
      const nextPage = allPages.length + 1;
      return hasMore ? nextPage : undefined;
    },
    retry: 2,
    retryDelay: 500,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000, // Данные хранятся 24 часа
  });
};

export const useWarehousesBase = () => {
  // Получаем список всех отделений (37.000+)
  return useQuery({
    queryKey: ['warehousesBase'],
    queryFn: () =>
      novaPoshtaRequest<IWarehouse>('Address', 'getWarehouses', {}),
    staleTime: 24 * 60 * 60 * 1000, // Данные хранятся 24 часа
    gcTime: 24 * 60 * 60 * 1000, // Данные хранятся 24 часа
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
