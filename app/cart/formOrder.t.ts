export enum CompanyPost {
  novaPoshta = 'novaPoshta',
  ukrPoshta = 'ukrPoshta',
  meest = 'meest',
}

export enum VariantsDelivery {
  warehouses = 'warehouses',
  home = 'home',
}
export interface IOptions {
  value: string;
  label: string;
  image: string;
  isWork: boolean;
}

export interface IFormField<I = string> {
  initialValue: I;
  name: string;
  placeholder: string;
  label: string;
  options?: IOptions[];
}

export type TFormFields = {
  name: IFormField;
  surname: IFormField;
  middleName: IFormField;
  number: IFormField;
  email: IFormField;
  comments: IFormField;
  voucher: IFormField;
  city: IFormField;
  warehouse?: IFormField;
  cityRef: IFormField;
  warehouseRef?: IFormField;
  delivery: IFormField<CompanyPost>;
  variantsDelivery: IFormField<VariantsDelivery>;
  address?: IFormField;
};

export interface IOrderSubmissionData {
  name: string;
  surname: string;
  middleName: string;
  number: string;
  email: string;
  comments?: string;
  voucher?: string;
  delivery: CompanyPost;
  city: string;
  cityRef: string;
  warehouse?: string;
  warehouseRef?: string;
  variantsDelivery: VariantsDelivery;
  address?: string;
}

// export type IFormFieldUserData = Array<IFormField<string>>;
