import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { formFields } from '../../common/initialFormValues';
import Image from 'next/image';

const SelectDelivery = () => {
  const { control, setValue } = useFormContext();
  const { name, options, initialValue } = formFields.delivery;

  return (
    <Box>
      <Controller
        control={control}
        name={name}
        defaultValue={initialValue}
        render={({ field }) => (
          <Select aria-labelledby={name} size="small" fullWidth {...field}>
            {/* todo: add disable */}
            {options?.map((option) => (
              <MenuItem
                value={option.value}
                key={option.value}
                disabled={!option?.isWork}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={option.image}
                    width={20}
                    height={20}
                    alt={`Logo ${option.label}`}
                    style={{ marginRight: 7 }}
                  />
                  {option.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </Box>
  );
};

export default SelectDelivery;
