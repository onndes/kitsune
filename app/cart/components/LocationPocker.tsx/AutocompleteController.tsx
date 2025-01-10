import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

interface AutocompleteControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  defaultValue: PathValue<T, Path<T>>;
  isDisabled: boolean;
  hasOptions: boolean;
  optionsList: Array<{
    Description: string;
    DescriptionRu: string;
    Ref: string;
  }>;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  handleScroll: (e: React.UIEvent<HTMLDListElement>) => void;
  label: string;
}

const AutocompleteController = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  isDisabled,
  hasOptions,
  optionsList,
  setInputValue,
  isLoading,
  isFetchingNextPage,
  handleScroll,
  label,
}: AutocompleteControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        return (
          <Autocomplete
            disabled={isDisabled}
            size="small"
            freeSolo
            options={
              hasOptions
                ? optionsList.map(
                    (option) => option.Description || option.DescriptionRu
                  )
                : []
            }
            value={
              optionsList.find((option) => option.Ref === field.value)
                ?.Description || ''
            }
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            onChange={(_, value) => {
              const selectedOption = optionsList.find(
                (option) => option.Description === value
              );
              field.onChange(selectedOption?.Ref || '');
            }}
            loading={isLoading}
            slotProps={{
              listbox: {
                sx: {
                  maxHeight: '180px',
                  overflow: 'auto',
                  fontSize: '14px',
                },
                onScroll: (e) => handleScroll(e),
              },
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label={label}
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
                          {isLoading ||
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
  );
};

export default AutocompleteController;
