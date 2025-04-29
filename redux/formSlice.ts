// store/formSlice.ts
import { getInitialValues } from '@/app/cart/common/getInitialValues';
import { formFields } from '@/app/cart/common/initialFormValues';
import { IOrderSubmissionData } from '@/app/cart/formOrder.t';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  savedData: IOrderSubmissionData;
  archivedData: IOrderSubmissionData;
}

const initialValue = getInitialValues(formFields) as IOrderSubmissionData;

const initialState: FormState = {
  savedData: initialValue,
  archivedData: initialValue,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<IOrderSubmissionData>) => {
      state.savedData = action.payload;
    },
    saveArchivedData: (state, action: PayloadAction<IOrderSubmissionData>) => {
      state.archivedData = action.payload;
    },
    clearForm: (state) => {
      state.savedData = initialValue;
    },
    clearArchivedData: (state) => {
      state.archivedData = initialValue;
    },
  },
});

export const { saveForm, clearForm, saveArchivedData, clearArchivedData } =
  formSlice.actions;
export default formSlice.reducer;
