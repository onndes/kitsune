import ControlInput from '@/app/cart/components/Form/ControlInput';
import MyButton from '@/app/cart/components/MyButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { formFields } from '../../common/initialFormValues';
import { extractedFields } from '../../common/orderFormFields';
import schema from '../../common/schema';
import LocationPicker from './LocationPicker.tsx/LocationPicker';
import SelectDelivery from './SelectDelivery';
import { getInitialValues } from '../../common/getInitialValues';
import { IOrderFormData } from '@/types/formOrder.t';

export const Form = () => {
  const form = useRef(null);

  const methods = useForm<IOrderFormData>({
    defaultValues: getInitialValues(formFields) as IOrderFormData,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IOrderFormData> = (
    orderFormData: IOrderFormData
  ) => {
    // тут был какой-то функционал отправки данных через EmailJs возможно в красивом виде, файлы в папке archive
    console.log(orderFormData);
  };

  return (
    <FormProvider {...methods}>
      <Box
        ref={form}
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="h6" fontSize={16} mb={1}>
            Одержувач замовлення
          </Typography>
          {extractedFields.userData.map((el) => (
            <ControlInput
              autoComplete="on"
              key={el.name}
              name={el.name}
              placeholder={el.placeholder}
              pb={2}
            />
          ))}

          <SelectDelivery />
          <LocationPicker />
        </Box>

        <MyButton
          type="submit"
          text="Оформити замовлення"
          fullWidth
          size="small"
          sx={{ width: '250px', margin: 'auto', fontSize: '16px', mt: 2 }}
        />
      </Box>
    </FormProvider>
  );
};
