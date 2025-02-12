import { IFormField } from '@/app/cart/formOrder.t';
import { extractFieldValues } from './getInitialValues';

interface ExtractedFields {
  userData: () => IFormField<string>[];
}

export const extractedFields: ExtractedFields = {
  userData: () =>
    extractFieldValues([
      'name',
      'surname',
      'middleName',
      'number',
      'email',
    ]).filter((field): field is IFormField<string> => field !== undefined),
};
