'use client';

import { Autocomplete, TextField, CircularProgress, Box } from '@mui/material';
import React, { useMemo, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import { useCities, useWarehouses } from '@/hooks/useNovaPoshta';
import { ICity } from '@/types/novaPoshta.t';
import { regionalCentersData } from '../../regionsCenterData';

interface SelectPostProps<T extends FieldValues> {
  control: Control<T>;
  watch: (name: Path<T>) => PathValue<T, Path<T>>;
}

const LocationPicker = <T extends FieldValues>({
  control,
  watch,
}: SelectPostProps<T>) => {
  const cityRef = watch('cityRef' as Path<T>) as string;

  const [inputValueCity, setInputValueCity] = useState('');
  const [inputValueWarehouses, setInputValueWarehouses] = useState('');

  const {
    data: warehouses,
    isLoading: loadingWarehouses,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useWarehouses({
    cityRef,
    findByString: inputValueWarehouses,
  });

  const postOffices = useMemo(
    () => warehouses?.pages.map((page) => page.data).flat() || [],
    [warehouses]
  );

  const dataCities = useCities({
    query: inputValueCity,
    initialPage: 1,
    limit: 40,
  });

  const {
    cities,
    isLoading: loadingCities,
    loadMore: loadMoreCities,
    hasMore: hasMoreCities,
  } = dataCities;

  const combinedCities: ICity[] = inputValueCity.trim()
    ? cities
    : regionalCentersData;

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
      hasNextPage &&
      !loadingWarehouses
    ) {
      fetchNextPage();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Выбор города */}
      <Controller
        name={'cityRef' as Path<T>}
        control={control}
        defaultValue={'' as PathValue<T, Path<T>>}
        render={({ field, fieldState }) => {
          return (
            <Autocomplete
              size="small"
              freeSolo
              options={combinedCities.map(
                (city) => city.Description || city.DescriptionRu
              )}
              value={
                combinedCities.find((city) => city.Ref === field.value)
                  ?.Description || ''
              }
              onInputChange={(_, newInputValue) =>
                setInputValueCity(newInputValue)
              }
              onChange={(_, value) => {
                const selectedCity = combinedCities.find(
                  (city) => city.Description === value
                );
                field.onChange(selectedCity?.Ref || '');
              }}
              loading={loadingCities}
              slotProps={{
                listbox: {
                  sx: {
                    maxHeight: '180px',
                    overflow: 'auto',
                    fontSize: '14px',
                  },
                  onScroll: (e) => handleScrollCity(e),
                },
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="Оберіть місто"
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingCities && <CircularProgress size={20} />}
                            {params.InputProps?.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                );
              }}
            />
          );
        }}
      />

      {/* Выбор отделения */}
      <Controller
        name={'warehouseRef' as Path<T>}
        control={control}
        defaultValue={'' as PathValue<T, Path<T>>}
        render={({ field, fieldState }) => {
          return (
            <Autocomplete
              disabled={!cityRef}
              size="small"
              freeSolo
              options={
                warehouses
                  ? postOffices.map(
                      (post) => post.Description || post.DescriptionRu
                    )
                  : []
              }
              value={
                postOffices.find((post) => post.Ref === field.value)
                  ?.Description || ''
              }
              onInputChange={(_, newInputValue) =>
                setInputValueWarehouses(newInputValue)
              } // вызывает бесконечный рендер
              onChange={(_, value) => {
                const selectedPost = postOffices.find(
                  (post) => post.Description === value
                );
                field.onChange(selectedPost?.Ref || '');
              }}
              loading={loadingWarehouses}
              slotProps={{
                listbox: {
                  sx: {
                    maxHeight: '180px',
                    overflow: 'auto',
                    fontSize: '14px',
                  },
                  onScroll: (e) => handleScrollWarehouses(e),
                },
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="Оберіть відділення чи поштомат"
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingWarehouses ||
                              (isFetchingNextPage && (
                                <CircularProgress size={20} />
                              ))}
                            {params.InputProps?.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                );
              }}
            />
          );
        }}
      />
    </Box>
  );
};

export default LocationPicker;
