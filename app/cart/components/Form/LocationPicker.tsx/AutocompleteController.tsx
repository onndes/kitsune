import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { IOrderSubmissionData, TFormFields } from '@/app/cart/formOrder.t';

interface AutocompleteControllerProps<T extends FieldValues> {
  name: Path<T>;
  nameRef: Path<T>;
  control: Control<T>;
  defaultValue: PathValue<T, Path<T>>;
  isDisabled: boolean;
  hasOptions: boolean;
  optionsList: Array<{
    Description: string;
    Ref: string;
    Present?: string;
  }>;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  handleScroll: (e: React.UIEvent<HTMLDListElement>) => void;
  label: string;
}

const AutocompleteController = <T extends FieldValues>({
  name,
  nameRef,
  control,
  defaultValue,
  isDisabled,
  hasOptions,
  optionsList,
  isLoading,
  isFetchingNextPage,
  handleScroll,
  label = '',
}: AutocompleteControllerProps<T>) => {
  const { setValue, watch } = useFormContext<IOrderSubmissionData>();
  const currentValue = watch(name as keyof TFormFields) || '';

  return (
    <Controller
      name={nameRef}
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
                ? optionsList.map((option) => {
                    return option.Description;
                  })
                : []
            }
            // value={
            //   optionsList.find((option) => option.Ref === field.value)
            //     ?.Description || ''
            // }

            value={currentValue}
            onInputChange={(_, newInputValue) => {
              setValue(
                name as keyof TFormFields,
                newInputValue as PathValue<T, Path<T>>
              );
            }}
            onChange={(_, value) => {
              const selectedOption = optionsList.find(
                (option) => option.Description === value
              );
              field.onChange(selectedOption?.Ref || '');
              setValue(
                name as keyof TFormFields,
                selectedOption?.Description || ''
              );
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
