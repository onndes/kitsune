import ControlInput from '@/app/cart/components/Form/ControlInput';
import MyButton from '@/app/components/MyButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { formFields } from '../../common/initialFormValues';
import { extractedFields } from '../../common/orderFormFields';
import schema from '../../common/schema';
import LocationPicker from './LocationPicker.tsx';
import SelectDelivery from './SelectDelivery';
import { getInitialValues } from '../../common/getInitialValues';
import { IOrderSubmissionData } from '@/app/cart/formOrder.t';
import SelectVariantDelivery from './SelectVariantDelivery';
import { useSendMessage } from '@/api/notification/useNotification';
import { useDispatch } from 'react-redux';
import { clearForm, saveArchivedData, saveForm } from '@/redux/formSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { isEqual, debounce } from 'lodash';
import ButtonLoadPrevData from '../ButtonLoadPrevData';

export const Form = () => {
  const dispatch = useDispatch();
  const form = useRef(null);
  const isFirstRender = useRef(true);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Теперь мы уверены, что клиент загружен
  }, []);

  const {
    data: savedData,
    archivedData,
  }: { data: IOrderSubmissionData; archivedData: IOrderSubmissionData } =
    useSelector((state: RootState) => state.form);

  const methods = useForm<IOrderSubmissionData>({
    defaultValues: savedData,
    resolver: yupResolver(schema),
  });
  const formValues = methods.watch();
  const { mutate: sendOrder, isPending, isSuccess, isError } = useSendMessage();

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveArchivedData(formValues));
      dispatch(clearForm());
      methods.reset();
    }
  }, [isSuccess]);

  const saveToRedux = useMemo(
    () =>
      debounce((values: IOrderSubmissionData) => {
        dispatch(saveForm(values));
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      saveToRedux(formValues);
    }
  }, [formValues]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (savedData) {
      methods.reset(savedData);
    }
  }, [savedData]);

  const onSubmit: SubmitHandler<IOrderSubmissionData> = (
    orderFormData: IOrderSubmissionData
  ) => {
    console.log('✅ Удача, данные отправлены ', orderFormData);
    sendOrder(orderFormData);
  };

  const handleLoadArchivedData = () => {
    if (!archivedData) return;
    methods.reset(archivedData);
  };

  const userDataFields = useMemo(() => extractedFields.userData(), []);
  const hasArchivedData = archivedData?.name;

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
