import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

interface ControlInputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  pb?: number;
  pt?: number;
  autoComplete?: string;
  sx?: object;
  otherProps?: TextFieldProps;
}

const ControlInput = <T extends FieldValues>({
  name,
  placeholder,
  pb = 0,
  pt = 0,
  autoComplete = 'off',
  sx = {},
  ...otherProps
}: ControlInputProps<T>) => {
  const { control } = useFormContext();
  const nameUpper =
    placeholder && placeholder.charAt(0).toUpperCase() + placeholder.slice(1);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          autoComplete={autoComplete}
          label={nameUpper}
          multiline={name === 'comments'}
          error={!!error}
          variant="standard"
          helperText={error ? error.message : null}
          placeholder={nameUpper}
          fullWidth
          size="small"
          slotProps={{
            formHelperText: {
              sx: {
                fontSize: '10px',
              },
            },
          }}
          sx={{
            pb,
            pt,
            ...sx,
            textarea: {
              minHeight: '100px',
            },
            fontSize: '14px',
          }}
          {...otherProps}
          {...field}
        />
      )}
    />
  );
};

export default ControlInput;
