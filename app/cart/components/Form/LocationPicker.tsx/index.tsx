'use client';

import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { useCities, useWarehouses } from '@/api/novaPoshta/useNovaPoshta';
import { ICity, IWarehouse } from '@/api/novaPoshta/novaPoshta.types';
import AutocompleteController from './AutocompleteController';
import { useDebounce } from 'use-debounce';
import { regionalCitiesData } from '@/app/cart/common/regionsCenterData';
import { handleScrollMorePage } from '@/app/cart/common/handleScrollMore';
import { formFields } from '@/app/cart/common/initialFormValues';
import SelectVariantDelivery from '../SelectVariantDelivery';
import SelectDelivery from '../SelectDelivery';
import { VariantsDelivery } from '@/app/cart/formOrder.t';
import AddressInput from '../AddressInput';

// todo: поиск отделений перевести в оффлайн, сохранять куда-то в базу так просит НП
const LocationPicker = <T extends FieldValues>() => {
  const { control, watch } = useFormContext();

  const city = watch('city');
  const cityRef = watch('cityRef');
  const warehouse = watch('warehouse');
  const variantsDelivery = watch('variantsDelivery');
  const [debouncedInputValueCity] = useDebounce(city, 400);
  const [debouncedWarehouseInput] = useDebounce(warehouse, 400);

  // const [typeDelivery, setTypeDelivery] = useState('home');

  // const handleSetTypeAddress = (valueTypeDelivery: TTypeDelivery) => {
  //   setTypeDelivery(valueTypeDelivery);
  // };

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

  const {
    data: warehouses,
    isLoading: loadingWarehouses,
    fetchNextPage: loadMoreWarehouses,
    hasNextPage: hasMoreWarehouses,
    isFetchingNextPage: isFetchingNextPageWarehouses,
  } = useWarehouses({
    cityRef,
    findByString: debouncedWarehouseInput?.trim(),
    // todo: убрать поиск если вибрана адресная доставка
  });

  const postOffices: IWarehouse[] = useMemo(
    () => warehouses?.pages.map((page) => page.data).flat() || [],
    [warehouses]
  );

  const combinedCities: ICity[] = useMemo(() => {
    return city?.trim()
      ? cities?.pages.map((page) => page.data[0].Addresses).flat() || []
      : regionalCitiesData;
  }, [cities?.pages, city]);

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
      <SelectDelivery />
      <SelectVariantDelivery />
      <AutocompleteController
        nameRef={formFields.cityRef.name as Path<T>}
        name={formFields.city.name as Path<T>}
        control={control}
        defaultValue={formFields.cityRef.initialValue as PathValue<T, Path<T>>}
        isDisabled={false}
        hasOptions={true}
        optionsList={combinedCities}
        isLoading={loadingCities}
        isFetchingNextPage={isFetchingNextPageCities}
        handleScroll={handleScrollCity}
        label={formFields.cityRef.placeholder}
      />
      {variantsDelivery === VariantsDelivery.warehouses && (
        <>
          {/* Выбор отделения */}
          <AutocompleteController
            name={formFields.warehouse?.name as Path<T>}
            nameRef={formFields.warehouseRef?.name as Path<T>}
            control={control}
            defaultValue={
              formFields.warehouseRef?.initialValue as PathValue<T, Path<T>>
            }
            isDisabled={!cityRef}
            hasOptions={!!warehouses}
            optionsList={postOffices}
            isLoading={loadingWarehouses}
            isFetchingNextPage={isFetchingNextPageWarehouses}
            handleScroll={handleScrollWarehouses}
            label={formFields.warehouseRef?.placeholder || ''}
          />
        </>
      )}
      <AddressInput />
    </Box>
  );
};

export default LocationPicker;
