export interface Address {
  id: number;
  address_name: string;
  address_number: string;
  cep: string;
  state?: string;
  city?: string;
  country?: string;
}
