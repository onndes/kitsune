import { Box, Divider, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import schema from './schema';
import ControlInput from '@/app/cart/components/ControlInput';
import MyButton from '@/app/cart/components/MyButton';

interface IFormData {
  comments?: string;
  voucher?: string;
  name: string;
  surname: string;
  number: string;
  email: string;
}

const formData: Array<{ name: keyof IFormData }> = [
  { name: 'name' },
  { name: 'surname' },
  { name: 'number' },
  { name: 'email' },
];

export const Form = () => {
  const form = useRef(null);
  // const cartProducts = useSelector(({ cart }) => cart.products)
  const { control, handleSubmit } = useForm<IFormData>({
    defaultValues: {
      comments: '',
      voucher: '',
      name: '',
      surname: '',
      number: '',
      email: '',
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
      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      <Typography
        variant="h5"
        color="text.secondary"
        fontSize="15px"
        fontWeight={600}
      >
        Additional Comments
      </Typography>
      <ControlInput
        name="comments"
        control={control}
        // multiline={true}
        sx={{
          pb: 2,
          textarea: {
            minHeight: '70px',
          },
        }}
      />

      <Divider />
      <Box pt={2} pb={2}>
        <ControlInput name="voucher" control={control} />
        <MyButton text="Apply Voucher" variant="outlined" fullWidth />
      </Box>
      <Box>
        {formData.map((el) => (
          <ControlInput
            autoComplete="on"
            key={el.name}
            name={el.name}
            control={control}
          />
        ))}
      </Box>
      <MyButton type="submit" text="Checkout Now" fullWidth />
    </Box>
  );
};
