import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { formFields } from '../../common/initialFormValues';
import SelectDeliveryItem from './SelectDeliveryItem';

const SelectDelivery = () => {
  const { control } = useFormContext();
  const { name, options } = formFields.delivery;
  return (
    <Box mb={1}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <Typography variant="h6" fontSize={16} mb={1}>
              Доставка (add disable)
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name={name + `radio-buttons-group`}
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
            >
              {/* todo: add disable */}
              {options?.map((option) => (
                <SelectDeliveryItem key={option.value} {...option} />
              ))}
            </RadioGroup>
          </>
        )}
      />
    </Box>
  );
};

export default SelectDelivery;
