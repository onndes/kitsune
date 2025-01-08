import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import Image from 'next/image';

interface SelectDeliveryProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

const SelectDelivery = <T extends FieldValues>({
  control,
  name,
}: SelectDeliveryProps<T>) => {
  return (
    <Box mb={1}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <Typography variant="h6" fontSize={16} mb={1}>
              Доставка
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={field.value}
              onChange={(_, value) => field.onChange(value)}
            >
              <FormControlLabel
                value="novaPoshta"
                control={<Radio />}
                // label="Нова пошта"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src="/image/logos/delivery/novaPoshta.svg"
                      width={20}
                      height={20}
                      alt="Logo NovaPoshta"
                      style={{ marginRight: 7 }}
                    />
                    Нова пошта
                  </Box>
                }
              />
              <FormControlLabel
                value="ukrPoshta"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src="/image/logos/delivery/ukrposhta.svg"
                      width={20}
                      height={20}
                      alt="Logo Ukrposhta"
                      style={{ marginRight: 7 }}
                    />
                    Укрпошта
                  </Box>
                }
                disabled
              />
              <FormControlLabel
                value="meest"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src="/image/logos/delivery/meest.svg"
                      width={20}
                      height={20}
                      alt="Logo Meest"
                      style={{ marginRight: 7 }}
                    />
                    Meest
                  </Box>
                }
                disabled
              />
            </RadioGroup>
          </>
        )}
      />
    </Box>
  );
};

export default SelectDelivery;
