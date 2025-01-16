export type TCompanyPost = 'novaPoshta' | 'ukrPoshta' | 'Meest';
export type TTypeDelivery = 'home' | 'warehouse';

export interface IOptions {
  value: string;
  label: string;
  image: string;
}

export interface IFormField<I> {
  initialValue: I;
  name: string;
  placeholder: string;
  label: string;
  options?: IOptions[];
}

export type TFormFields = {
  name: IFormField<string>;
  surname: IFormField<string>;
  middleName: IFormField<string>;
  number: IFormField<string>;
  email: IFormField<string>;
  comments: IFormField<string>;
  voucher: IFormField<string>;
  cityRef: IFormField<string>;
  warehouseRef: IFormField<string>;
  delivery: IFormField<TCompanyPost>;
  typeDelivery: IFormField<TTypeDelivery>;
};

export interface IOrderFormData {
  comments?: string;
  voucher?: string;
  name: string;
  surname: string;
  middleName: string;
  number: string;
  email: string;
  cityRef: string;
  warehouseRef: string;
  delivery: TCompanyPost;
  typeDelivery: TTypeDelivery;
}

// export type IFormFieldUserData = Array<IFormField<string>>;
