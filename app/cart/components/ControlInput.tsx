import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ControlInputProps<T extends FieldValues> {
  control: Control<T>; // Типизируем `control`
  name: Path<T>; // Указываем, что `name` должен быть ключом объекта формы
  pb?: number; // Опциональные значения
  pt?: number;
  autoComplete?: string;
  sx?: object;
  otherProps?: TextFieldProps; // Дополнительные пропсы для `TextField`
}

const ControlInput = <T extends FieldValues>({
  control,
  name,
  pb = 1,
  pt = 0,
  autoComplete = 'off',
  sx = {},
  ...otherProps
}: ControlInputProps<T>) => {
  const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          autoComplete={autoComplete}
          label={nameUpper}
          multiline={name === 'description'} // Условие для текстовой области
          error={!!error}
          variant="outlined"
          helperText={error ? error.message : null}
          placeholder={nameUpper}
          fullWidth
          FormHelperTextProps={{
            sx: {
              fontSize: '12px',
            },
          }}
          sx={{
            pb,
            pt,
            ...sx,
            textarea: {
              minHeight: '100px',
            },
          }}
          {...otherProps}
          {...field}
        />
      )}
    />
  );
};

export default ControlInput;
