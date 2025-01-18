import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

interface Dimensions {
  Width: number;
  Height: number;
  Length: number;
}

interface Schedule {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

export interface INovaPoshtaApiResponse<T> {
  success: boolean;
  data: T[];
  errors: string[];
  warnings: string[];
  info: string[];
  messageCodes: string[];
  errorCodes: string[];
  warningCodes: string[];
  infoCodes: string[];
  nextPage?: number;
}

export interface ICity {
  Present: string;
  Description: string;
  Warehouses: number;
  MainDescription: string;
  Area: string;
  Region: string;
  SettlementTypeCode: string;
  Ref: string;
  DeliveryCity: string;
  AddressDeliveryAllowed: boolean;
  StreetsAvailability: boolean;
  ParentRegionTypes: string;
  ParentRegionCode: string;
  RegionTypes: string;
  RegionTypesCode: string;
}

export interface ICityPage {
  TotalCount: number;
  Addresses: ICity[];
}

export interface IWarehouse {
  SiteKey: string;
  Description: string;
  DescriptionRu: string;
  ShortAddress: string;
  ShortAddressRu: string;
  Phone: string;
  TypeOfWarehouse: string;
  Ref: string;
  Number: string;
  CityRef: string;
  CityDescription: string;
  CityDescriptionRu: string;
  SettlementRef: string;
  SettlementDescription: string;
  SettlementAreaDescription: string;
  SettlementRegionsDescription: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  Longitude: string;
  Latitude: string;
  PostFinance: string;
  BicycleParking: string;
  PaymentAccess: string;
  POSTerminal: string;
  InternationalShipping: string;
  SelfServiceWorkplacesCount: string;
  TotalMaxWeightAllowed: string;
  PlaceMaxWeightAllowed: string;
  SendingLimitationsOnDimensions: Dimensions;
  ReceivingLimitationsOnDimensions: Dimensions;
  Reception: Schedule;
  Delivery: Schedule;
  Schedule: Schedule;
  DistrictCode: string;
  WarehouseStatus: string;
  WarehouseStatusDate: string;
  WarehouseIllusha: string;
  CategoryOfWarehouse: string;
  Direct: string;
  RegionCity: string;
  WarehouseForAgent: string;
  GeneratorEnabled: string;
  MaxDeclaredCost: string;
  WorkInMobileAwis: string;
  DenyToSelect: string;
  CanGetMoneyTransfer: string;
  HasMirror: string;
  HasFittingRoom: string;
  OnlyReceivingParcel: string;
  PostMachineType: string;
  PostalCodeUA: string;
  WarehouseIndex: string;
  BeaconCode: string;
  Location: string;
}

export interface useCitiesProps {
  query: string;
  initialPage: number;
  limit: number;
}

export type TUseCitiesResult = UseInfiniteQueryResult<
  InfiniteData<INovaPoshtaApiResponse<ICityPage>>
>;

export type TUseWarehousesResult = UseInfiniteQueryResult<
  InfiniteData<INovaPoshtaApiResponse<IWarehouse>>
>;

export interface useWarehousesProps {
  cityRef: string | null;
  findByString: string;
  limit?: number;
}
