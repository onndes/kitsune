import { IFormField } from '@/types/formOrder.t';
import { extractFieldValues } from './getInitialValues';

export const extractedFields: { userData: IFormField<string>[] } = {
  userData: extractFieldValues([
    'name',
    'surname',
    'middleName',
    'number',
    'email',
  ]),
};
