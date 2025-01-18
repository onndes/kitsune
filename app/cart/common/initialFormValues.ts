import { TFormFields } from '@/app/cart/formOrder.t';

export const formFields: TFormFields = {
  name: {
    initialValue: '',
    name: 'name',
    placeholder: "Ім'я",
    label: "Ім'я",
  },
  surname: {
    initialValue: '',
    name: 'surname',
    placeholder: 'Прізвище',
    label: 'Прізвище',
  },
  middleName: {
    initialValue: '',
    name: 'middleName',
    placeholder: 'По батькові',
    label: 'По батькові',
  },
  number: {
    initialValue: '',
    name: 'number',
    placeholder: 'Номер телефону',
    label: 'Номер телефону',
  },
  email: {
    initialValue: '',
    name: 'email',
    placeholder: 'Електронна пошта',
    label: 'Email',
  },
  comments: {
    initialValue: '',
    name: 'comments',
    placeholder: 'Введіть ваші коментарі',
    label: 'Коментарі',
  },
  voucher: {
    initialValue: '',
    name: 'voucher',
    placeholder: 'Введіть ваш код ваучера',
    label: 'Ваучер',
  },

  cityRef: {
    initialValue: '',
    name: 'cityRef',
    placeholder: 'Оберіть місто',
    label: 'Місто',
  },
  warehouseRef: {
    initialValue: '',
    name: 'warehouseRef',
    placeholder: 'Введіть номер відділення чи поштомата',
    label: 'Введіть номер відділення чи поштомата',
  },
  delivery: {
    initialValue: 'novaPoshta',
    name: 'delivery',
    placeholder: 'Оберіть метод доставки',
    label: 'Метод доставки',
    options: [
      {
        value: 'novaPoshta',
        label: 'Нова пошта',
        image: '/image/logos/delivery/novaPoshta.svg',
      },
      {
        value: 'ukrPoshta',
        label: 'Укрпошта',
        image: '/image/logos/delivery/ukrposhta.svg',
      },
      {
        value: 'meest',
        label: 'Meest',
        image: '/image/logos/delivery/meest.svg',
      },
    ],
  },
  typeDelivery: {
    initialValue: 'home',
    name: 'typeDelivery',
    placeholder: 'Оберіть тип доставки',
    label: 'Тип доставки',
  },
};
