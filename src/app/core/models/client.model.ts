export interface Client {
  clientId?: number | string;
  clientName: string;
  clientNameDesc: string;
  image: string;
  displayOrder: number;
  isActive?: boolean;
}
