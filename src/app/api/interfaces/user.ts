import { Address } from "./address";
import { Contact } from "./contact";

export interface User {
  id?: string;
  name?: string;
  surname?: string;
  email?: string;
  contact_id?: number;
  address_id?: number;
  document_id?: number;
  profile_id?: number;
  address?: Address
  contact?: Contact
}
