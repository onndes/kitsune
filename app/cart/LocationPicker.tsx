'use client';

import {
  Autocomplete,
  TextField,
  Box,
  CircularProgress,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import { useCities, useWarehouses } from '@/hooks/useNovaPoshta';
import { ICity } from '@/types/novaPoshta.t';
import { regionalCentersData } from './regionsCenterData';

interface SelectPostProps<T extends FieldValues> {
  control: Control<T>; // Типизируем `control`
  watch: (name: Path<T>) => PathValue<T, Path<T>>;
}

const LocationPicker = <T extends FieldValues>({
  control,
  watch,
}: SelectPostProps<T>) => {
  const cityRef = watch('cityRef' as Path<T>) as string;

  const { data: warehouses, isLoading: loadingWarehouses } =
    useWarehouses(cityRef);

  const [inputValue, setInputValue] = useState('');
  // const [page, setPage] = useState(1);
  // const [citiesList, setCitiesList] = useState<ICity[]>([]);
  const {
    cities,
    isLoading: loadingCities,
    loadMore: loadMoreCities,
    hasMore: hasMoreCities,
  } = useCities({
    query: inputValue,
    initialPage: 1,
    limit: 40,
  });

  const combinedCities: ICity[] = inputValue.trim()
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

  return (
    <>
      {/* Выбор города */}
      <Controller
        name={'cityRef' as Path<T>}
        control={control}
        defaultValue={'' as PathValue<T, Path<T>>}
        render={({ field, fieldState }) => {
          const selectedCity = combinedCities.find(
            (city) => city.Ref === field.value
          );
          const selectedCityDescription = selectedCity?.Description || '';
          return (
            <Autocomplete
              size="small"
              freeSolo
              options={combinedCities.map(
                (city) => city.Description || city.DescriptionRu
              )}
              value={selectedCityDescription}
              onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
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
        render={({ field }) => (
          <Box sx={{ position: 'relative', mt: 2 }}>
            {loadingWarehouses && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
            <Select
              {...field}
              fullWidth
              displayEmpty
              variant="outlined"
              size="small"
              disabled={!cityRef || loadingWarehouses}
            >
              <MenuItem value="" disabled>
                {loadingWarehouses
                  ? 'Завантаження відділень...'
                  : 'Оберіть відділення'}
              </MenuItem>
              {warehouses?.data.map((warehouse) => (
                <MenuItem key={warehouse.Ref} value={warehouse.Ref}>
                  {warehouse.Description}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
      />
    </>
  );
};

export default LocationPicker;
