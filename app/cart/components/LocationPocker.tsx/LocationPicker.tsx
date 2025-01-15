'use client';

import { Box } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { useCities, useWarehouses } from '@/hooks/useNovaPoshta';
import { ICity, IWarehouse } from '@/types/novaPoshta.t';
import { regionalCentersData } from '../../regionsCenterData';
import AutocompleteController from './AutocompleteController';
import { useDebounce } from 'use-debounce';

interface SelectPostProps<T extends FieldValues> {
  control: Control<T>;
  watch: (name: Path<T>) => PathValue<T, Path<T>>;
}

// todo: поиск отделений перевести в оффлайн, сохранять куда-то в базу так просит НП
const LocationPicker = <T extends FieldValues>({
  control,
  watch,
}: SelectPostProps<T>) => {
  const cityRef = watch('cityRef' as Path<T>) as string;

  const [inputValueCity, setInputValueCity] = useState('');
  const [inputValueWarehouses, setInputValueWarehouses] = useState('');
  const [debouncedInputValueCity] = useDebounce(inputValueCity, 400);
  const [debouncedInputValueWarehouses] = useDebounce(
    inputValueWarehouses,
    1500
  );

  const {
    data: warehouses,
    isLoading: loadingWarehouses,
    fetchNextPage: fetchNextPageWarehouses,
    hasNextPage: hasNextPageWarehouses,
    isFetchingNextPage: isFetchingNextPageWarehouses,
  } = useWarehouses({
    cityRef,
    findByString: debouncedInputValueWarehouses.trim(),
  });

  const postOffices: IWarehouse[] = useMemo(
    () => warehouses?.pages.map((page) => page.data).flat() || [],
    [warehouses]
  );

  const {
    data: cities,
    isLoading: loadingCities,
    fetchNextPage: loadMoreCities,
    hasNextPage: hasMoreCities,
    isFetchingNextPage: isFetchingNextPageCities,
  } = useCities({
    query: debouncedInputValueCity,
    initialPage: 1,
    limit: 40,
  });

  const combinedCities: ICity[] = useMemo(() => {
    return inputValueCity.trim()
      ? cities?.pages.map((page) => page.data[0].Addresses).flat() || []
      : regionalCentersData;
  }, [cities?.pages, inputValueCity]);

  const handleScrollCity = (event: React.UIEvent<HTMLDListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.target as HTMLDivElement;
    if (
      scrollHeight - scrollTop <= clientHeight + 10 &&
      hasMoreCities &&
      !loadingCities
    ) {
      loadMoreCities();
    }
  };

  const handleScrollWarehouses = (event: React.UIEvent<HTMLDListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.target as HTMLDivElement;
    if (
      scrollHeight - scrollTop <= clientHeight + 10 &&
      hasNextPageWarehouses &&
      !loadingWarehouses
    ) {
      fetchNextPageWarehouses();
    }
  };

  // const { data: warehousesBase } = useWarehousesBase();
  // console.log(
  //   '🐞 [LocationPicker.tsx][95] warehousesBase:',
  //   warehousesBase?.data[0]
  // );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Выбор города */}
      {/* <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          // if (warehousesBase) uploadWarehouses(warehousesBase.data);
          fetchAllWarehouses();
        }}
      >
        Load
      </Button> */}
      <AutocompleteController
        name={'cityRef' as Path<T>}
        control={control}
        defaultValue={'' as PathValue<T, Path<T>>}
        isDisabled={false}
        hasOptions={true}
        optionsList={combinedCities}
        setInputValue={setInputValueCity}
        isLoading={loadingCities}
        isFetchingNextPage={isFetchingNextPageCities}
        handleScroll={handleScrollCity}
        inputValue={inputValueCity}
        label="Оберіть місто"
      />
      {/* Выбор отделения */}
      <AutocompleteController
        name={'warehouseRef' as Path<T>}
        control={control}
        defaultValue={'' as PathValue<T, Path<T>>}
        isDisabled={!cityRef}
        hasOptions={!!warehouses}
        optionsList={postOffices}
        setInputValue={setInputValueWarehouses}
        isLoading={loadingWarehouses}
        isFetchingNextPage={isFetchingNextPageWarehouses}
        handleScroll={handleScrollWarehouses}
        inputValue={inputValueWarehouses}
        label="Введіть номер відділення чи поштомата"
      />
    </Box>
  );
};

export default LocationPicker;
