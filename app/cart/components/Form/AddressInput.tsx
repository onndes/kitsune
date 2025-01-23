import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { formFields } from '../../common/initialFormValues';
import { TextField } from '@mui/material';
import ControlInput from './ControlInput';
import { Varela_Round } from 'next/font/google';
import { VariantsDelivery } from '../../formOrder.t';

const AddressInput = () => {
  const { watch } = useFormContext();
  const { name, placeholder } = formFields.address;

  const variantsDelivery = watch('variantsDelivery');

  if (variantsDelivery !== VariantsDelivery.home) return null;

  return (
    <ControlInput
      autoComplete="on"
      name={name}
      placeholder={placeholder}
      pb={0}
    />
  );
};

export default AddressInput;
