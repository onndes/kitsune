import { DocumentReference } from 'firebase/firestore';

interface IDescriptionProduct {
  title: string;
  paragraphs: string[];
}

interface IFeatureProduct {
  feature: string;
  title: string;
}

type TImageProduct = string[];

export type TLastProductId = string | null;

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
  image: TImageProduct;
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
  image: TImageProduct;
  name: string;
  price: number;
  subcategory: string;
}

export interface IGetProductsParams {
  category?: string;
  subcategory?: string;
  limitNumber?: number;
  lastDocId?: TLastProductId;
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
