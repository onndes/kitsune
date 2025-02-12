import { TFormFields } from '@/app/cart/formOrder.t';
import { formFields } from './initialFormValues';

export const getInitialValues = (fields: TFormFields) => {
  return Object.keys(fields).reduce(
    (acc, key) => {
      const fieldKey = key as keyof TFormFields;
      if (fields[fieldKey] !== undefined) {
        acc[fieldKey] = fields[fieldKey]!.initialValue;
      }
      return acc;
    },
    {} as Record<keyof TFormFields, string>
  );
};

export const extractFieldValues = (needKeys: string[]) => {
  const fields: TFormFields = formFields;
  return Object.keys(fields).reduce(
    (acc, key) => {
      if (needKeys.includes(key)) {
        acc.push(fields[key as keyof TFormFields]);
      }
      return acc;
    },
    [] as Array<TFormFields[keyof TFormFields]>
  );
};
