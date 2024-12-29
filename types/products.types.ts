import { DocumentReference } from 'firebase/firestore';

export interface IDescriptionProduct {
  title: string;
  paragraphs: string[];
}

export interface IFeatureProduct {
  feature: string;
  title: string;
}

export type IImageProduct = string[];

export interface IProductWithDocRef {
  brand: string;
  category: DocumentReference;
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
  subcategory: DocumentReference;
}

export interface IProduct {
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
  limitNumber?: number;
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
  category: DocumentReference;
}

export interface ISubCategoryWithPath extends ICategory {
  category: string;
}
