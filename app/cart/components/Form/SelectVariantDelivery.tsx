import { Box, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { formFields } from '../../common/initialFormValues';

const SelectVariantDelivery = () => {
  const { control } = useFormContext();
  const { name, options, initialValue } = formFields.variantsDelivery;

  return (
    <Box>
      <Controller
        control={control}
        name={name}
        defaultValue={initialValue}
        render={({ field }) => (
          <Select aria-labelledby={name} size="small" fullWidth {...field}>
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </Box>
  );
};

export default SelectVariantDelivery;
