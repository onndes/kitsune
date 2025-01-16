import { TCompanyPost, TTypeDelivery } from '@/types/formOrder.t';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup
      .string()
      .required('Ім’я є обов’язковим')
      .min(2, 'Ім’я повинно містити щонайменше 2 символи')
      .max(50, 'Ім’я не може бути довше 50 символів'),
    surname: yup
      .string()
      .required('Прізвище є обов’язковим')
      .min(2, 'Прізвище повинно містити щонайменше 2 символи')
      .max(50, 'Прізвище не може бути довше 50 символів'),
    middleName: yup
      .string()
      .required('По батькові є обов’язковим')
      .min(2, 'По батькові повинно містити щонайменше 2 символи')
      .max(50, 'По батькові не може бути довше 50 символів'),
    number: yup
      .string()
      .required('Номер телефону є обов’язковим')
      .matches(/^\d{10}$/, 'Номер телефону повинен містити 10 цифр'),
    email: yup
      .string()
      .required('Електронна пошта є обов’язковою')
      .email('Недійсна електронна адреса')
      .max(100, 'Електронна пошта не може бути довше 100 символів'),
    voucher: yup.string().max(20, 'Код ваучера не може бути довше 20 символів'),
    comments: yup
      .string()
      .max(500, 'Коментарі не можуть бути довше 500 символів'),
    cityRef: yup.string().required('Вибір міста є обов’язковим'),
    warehouseRef: yup.string().required('Вибір відділення є обов’язковим'),
    delivery: yup
      .mixed<TCompanyPost>()
      .oneOf(['novaPoshta', 'ukrPoshta'], 'Неправильна служба доставки')
      .required('Вибір служби доставки є обов’язковим'),
    typeDelivery: yup
      .mixed<TTypeDelivery>()
      .oneOf(['home', 'warehouse'], 'Неправильний тип доставки')
      .required('Вибір типу адреси є обов’язковим'),
  })
  .required();

export default schema;
