export interface Client {
  clientId?: number | string;
  clientName: string;
  clientNameDesc: string;
  image: string;
  displayOrder: number;
  isActive?: boolean;
  cities?: ClientCity[];
}

export interface ClientCity {
  cityId?: number;
  cityName: string;
  isActive?: boolean;
}
