import { TFormFields } from './initialFormValues';

export const getInitialValues = (fields: TFormFields) => {
  return Object.keys(fields).reduce(
    (acc, key) => {
      const fieldKey = key as keyof TFormFields;
      acc[fieldKey] = fields[fieldKey].initialValue;
      return acc;
    },
    {} as Record<keyof TFormFields, string>
  );
};
