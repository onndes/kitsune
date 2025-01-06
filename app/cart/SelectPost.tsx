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
import { regionalCenters } from './regionsCenters';
import { useCities, useWarehouses } from '@/hooks/useNovaPoshta';

interface SelectPostProps<T extends FieldValues> {
  control: Control<T>; // Типизируем `control`
  watch: (name: Path<T>) => PathValue<T, Path<T>>;
}

const SelectPost = <T extends FieldValues>({
  control,
  watch,
}: SelectPostProps<T>) => {
  const cityRef = watch('cityRef' as Path<T>) as string;
  const { data: warehouses, isLoading: loadingWarehouses } =
    useWarehouses(cityRef);

  const [inputValue, setInputValue] = useState('');
  const { cities, isLoading: loadingCities } = useCities(inputValue);

  // Объединяем предопределённые города с результатами поиска
  const combinedCities = inputValue.trim()
    ? cities
    : regionalCenters.map((city) => ({
        Ref: city.Ref,
        Description: city.Description,
      }));

  return (
    <>
      {/* Выбор города */}
      <Controller
        name={'cityRef' as Path<T>}
        control={control}
        defaultValue={'' as PathValue<T, Path<T>>}
        render={({ field, fieldState }) => (
          <Autocomplete
            size="small"
            freeSolo
            options={combinedCities.map((city) => city.Description)}
            value={field.value}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            loading={loadingCities}
            slotProps={{
              listbox: {
                sx: {
                  maxHeight: '200px',
                  overflow: 'auto',
                },
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
        )}
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

export default SelectPost;
