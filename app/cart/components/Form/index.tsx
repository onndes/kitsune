'use client';

import ControlInput from '@/app/cart/components/Form/ControlInput';
import MyButton from '@/app/components/MyButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { extractedFields } from '../../common/orderFormFields';
import schema from '../../common/schema';
import LocationPicker from './LocationPicker.tsx';
import { IOrderSubmissionData } from '@/app/cart/formOrder.t';
import { useSendMessage } from '@/api/notification/useNotification';
import { useDispatch } from 'react-redux';
import { clearForm, saveArchivedData, saveForm } from '@/redux/formSlice';
import ButtonLoadPrevData from '../ButtonLoadPrevData';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getInitialValues } from '../../common/getInitialValues';
import { formFields } from '../../common/initialFormValues';

const initialValue = getInitialValues(formFields) as IOrderSubmissionData;

export const Form = () => {
  const dispatch = useDispatch();
  const form = useRef(null);
  const isFirstRender = useRef(true);

  const { savedData, archivedData } = useAppSelector((state) => state.form);

  const methods = useForm<IOrderSubmissionData>({
    defaultValues: savedData,
    resolver: yupResolver(schema),
  });
  const {
    mutate: sendOrder,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useSendMessage();

  const formValues = methods.watch();

  // Вывод сообщения про успешную отправку
  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    // При успешной отправки формы очищаем данные формы и
    // сохраняем данные пользователя для восстановления формы,
    if (isSuccess) {
      dispatch(saveArchivedData(formValues));
      dispatch(clearForm());
      methods.reset(initialValue);
    }
  }, [isSuccess]);

  useEffect(() => {
    // Сохраняем данные формы в redux
    // при изменении данных формы и если они не равны сохраненным данным
    // и не равны начальным данным
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (
      JSON.stringify(formValues) !== JSON.stringify(savedData) &&
      JSON.stringify(formValues) !== JSON.stringify(initialValue)
    ) {
      dispatch(saveForm(formValues));
    }
  }, [formValues]);

  useEffect(() => {
    // Заполняем форму данными из redux

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (savedData) {
      Object.keys(savedData).forEach((key) => {
        methods.setValue(
          key as keyof IOrderSubmissionData,
          savedData[key as keyof IOrderSubmissionData] || ''
        );
      });
    }
  }, [savedData]);

  const onSubmit: SubmitHandler<IOrderSubmissionData> = (
    orderFormData: IOrderSubmissionData
  ) => {
    sendOrder(orderFormData);
  };

  const handleLoadArchivedData = () => {
    if (!archivedData) return;
    methods.reset(archivedData);
  };

  const userDataFields = useMemo(() => extractedFields.userData(), []);

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

          <ButtonLoadPrevData
            handleLoadArchivedData={handleLoadArchivedData}
            isName={!!archivedData?.name}
          />

          {userDataFields.map((el) => (
            <ControlInput
              autoComplete="on"
              key={el.name}
              name={el.name}
              placeholder={el.placeholder}
              pb={2}
            />
          ))}

          <Typography variant="h6" fontSize={16} mb={1}>
            Доставка
          </Typography>
          <LocationPicker />
        </Box>
        <Box
          mt={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {isError && (
            <Typography textAlign="center" color="error" fontSize={13}>
              Помилка при відправці замовлення
            </Typography>
          )}
          {isSuccess && (
            <Typography textAlign="center" color="success" fontSize={13}>
              Замовлення успішно відправлено
            </Typography>
          )}
          <MyButton
            type="submit"
            text="Оформити замовлення"
            fullWidth
            size="small"
            loading={isPending}
            sx={{ width: '250px', margin: 'auto', fontSize: '16px', mt: 0 }}
          />
        </Box>
      </Box>
    </FormProvider>
  );
};
