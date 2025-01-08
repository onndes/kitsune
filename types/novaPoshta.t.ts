export interface INovaPoshtaResponse<T> {
  success: boolean;
  data: T[];
  errors: string[];
  translatedErrors: string[];
  warnings: string[];
  info: string[];
  messageCodes: string[];
  errorCodes: string[];
  warningCodes: string[];
  infoCodes: string[];
}

export interface ICity {
  Ref: string;
  Description: string;
  DescriptionRu: string;
  Area: string;
  AreaDescription: string;
  AreaDescriptionRu: string;
  CityID: string;
  SettlementType: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  IsBranch: string;
  PreventEntryNewStreetsUser: string;
  SpecialCashCheck?: number;
  Delivery1: string;
  Delivery2: string;
  Delivery3: string;
  Delivery4: string;
  Delivery5: string;
  Delivery6: string;
  Delivery7: string;
}

export interface IWarehouse {
  Ref: string;
  Description: string;
}
