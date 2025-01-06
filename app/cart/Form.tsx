import { Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import schema from './schema';
import ControlInput from '@/app/cart/components/ControlInput';
import MyButton from '@/app/cart/components/MyButton';
import SelectPost from './SelectPost';

interface IFormData {
  comments?: string;
  voucher?: string;
  name: string;
  surname: string;
  middleName: string;
  number: string;
  email: string;
  cityRef: string;
  warehouseRef: string;
}

const formData: Array<{ name: keyof IFormData; placeholder?: string }> = [
  { name: 'name', placeholder: "Ім'я" },
  { name: 'middleName', placeholder: 'По батькові ' },
  { name: 'surname', placeholder: 'Прізвище' },
  { name: 'number', placeholder: 'Номер' },
  { name: 'email', placeholder: 'Електронна пошта' },
];

export const Form = () => {
  const form = useRef(null);
  const { control, handleSubmit, watch } = useForm<IFormData>({
    defaultValues: {
      comments: '',
      voucher: '',
      name: '',
      surname: '',
      middleName: '',
      number: '',
      email: '',
      cityRef: '',
      warehouseRef: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormData> = (data: IFormData) => {
    // const sendData = {
    //     service_id: 'service_03w4wum',
    //     template_id: 'template_5f9fhch',
    //     user_id: 'PRUuy4BGSiuCbYLgx',
    //     template_params: {
    //         numberOrder: '#0#',
    //         table: getTable(cartProducts),
    //         ...data,
    //     },
    // }
    // axios
    //     .post('https://api.emailjs.com/api/v1.0/email/send', sendData)

    //     .then((response) => {
    //         console.log(response)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Box
      ref={form}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
        {formData.map((el) => (
          <ControlInput
            autoComplete="on"
            key={el.name}
            name={el.name}
            placeholder={el.placeholder}
            control={control}
            pb={2}
          />
        ))}
        <Typography variant="h6" fontSize={16} mb={1}>
          Доставка новою поштою
        </Typography>
        <SelectPost control={control} watch={watch} />
      </Box>

      <MyButton
        type="submit"
        text="Оформити замовлення"
        fullWidth
        size="small"
        sx={{ width: '250px', margin: 'auto', fontSize: '16px', mt: 2 }}
      />
    </Box>
  );
};
