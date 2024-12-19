export interface IDescriptionProduct {
  paragraphs: string[];
}

export interface IFeatureProduct {
  feature: string;
  title: string;
}

export type IImageProduct = string[];

export interface IOneProduct {
  brand: string;
  category: string;
  code: number;
  count: number;
  dateCreated: string;
  descriptions: IDescriptionProduct[];
  title: string;
  discount: number;
  features: IFeatureProduct[];
  image: IImageProduct;
  name: string;
  price: number;
  subcategory: string;
}

export interface IGetProductsParams {
  category?: string;
  subcategory?: string;
  limitNumber: number;
}

export interface ICategory {
  enName: string;
  id: string;
  nameDoc: string;
  ruName: string;
  sortIndex: number;
  ukName: string;
}

export interface ISubCategory extends ICategory {
  category: string;
}
