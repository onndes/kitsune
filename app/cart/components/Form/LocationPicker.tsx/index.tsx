'use client';

import { Box, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { useCities, useWarehouses } from '@/api/novaPoshta/useNovaPoshta';
import { ICity, IWarehouse } from '@/api/novaPoshta/novaPoshta.types';
import AutocompleteController from './AutocompleteController';
import { useDebounce } from 'use-debounce';
import { regionalCitiesData } from '@/app/cart/common/regionsCenterData';
import { handleScrollMorePage } from '@/app/cart/common/handleScrollMore';
import { formFields } from '@/app/cart/common/initialFormValues';

// todo: поиск отделений перевести в оффлайн, сохранять куда-то в базу так просит НП
const LocationPicker = <T extends FieldValues>() => {
  const { control, watch } = useFormContext();

  const cityRef = watch('cityRef' as Path<T>) as string;

  const [inputValueCity, setInputValueCity] = useState('');
  const [inputValueWarehouses, setInputValueWarehouses] = useState('');

  const [debouncedInputValueCity] = useDebounce(inputValueCity, 400);
  const [debouncedWarehouseInput] = useDebounce(inputValueWarehouses, 400);

  // const [typeDelivery, setTypeDelivery] = useState('home');

  // const handleSetTypeAddress = (valueTypeDelivery: TTypeDelivery) => {
  //   setTypeDelivery(valueTypeDelivery);
  // };

  const {
    data: warehouses,
    isLoading: loadingWarehouses,
    fetchNextPage: loadMoreWarehouses,
    hasNextPage: hasMoreWarehouses,
    isFetchingNextPage: isFetchingNextPageWarehouses,
  } = useWarehouses({
    cityRef,
    findByString: debouncedWarehouseInput.trim(),
  });

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

  const postOffices: IWarehouse[] = useMemo(
    () => warehouses?.pages.map((page) => page.data).flat() || [],
    [warehouses]
  );

  const combinedCities: ICity[] = useMemo(() => {
    return inputValueCity.trim()
      ? cities?.pages.map((page) => page.data[0].Addresses).flat() || []
      : regionalCitiesData;
  }, [cities?.pages, inputValueCity]);

  const handleScrollCity = (e: React.UIEvent<HTMLDListElement>) => {
    handleScrollMorePage(e, hasMoreCities, loadingCities, loadMoreCities);
  };

  const handleScrollWarehouses = (e: React.UIEvent<HTMLDListElement>) => {
    handleScrollMorePage(
      e,
      hasMoreWarehouses,
      loadingWarehouses,
      loadMoreWarehouses
    );
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
      <Typography variant="h6" fontSize={16} mb={1}>
        Адреса доставки
      </Typography>
      <AutocompleteController
        name={formFields.cityRef.name as Path<T>}
        control={control}
        defaultValue={formFields.cityRef.initialValue as PathValue<T, Path<T>>}
        isDisabled={false}
        hasOptions={true}
        optionsList={combinedCities}
        setInputValue={setInputValueCity}
        isLoading={loadingCities}
        isFetchingNextPage={isFetchingNextPageCities}
        handleScroll={handleScrollCity}
        inputValue={inputValueCity}
        label={formFields.cityRef.name}
      />
      {/* Выбор отделения */}

      <AutocompleteController
        name={formFields.warehouseRef.name as Path<T>}
        control={control}
        defaultValue={
          formFields.warehouseRef.initialValue as PathValue<T, Path<T>>
        }
        isDisabled={!cityRef}
        hasOptions={!!warehouses}
        optionsList={postOffices}
        setInputValue={setInputValueWarehouses}
        isLoading={loadingWarehouses}
        isFetchingNextPage={isFetchingNextPageWarehouses}
        handleScroll={handleScrollWarehouses}
        inputValue={inputValueWarehouses}
        label={formFields.warehouseRef.label}
      />
    </Box>
  );
};

export default LocationPicker;
