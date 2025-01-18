import { IOptions } from '@/app/cart/formOrder.t';
import { FormControlLabel, Radio, Box } from '@mui/material';
import Image from 'next/image';

const SelectDeliveryItem = (option: IOptions) => {
  return (
    <FormControlLabel
      value={option.value}
      control={<Radio />}
      label={
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
      }
    />
  );
};

export default SelectDeliveryItem;
