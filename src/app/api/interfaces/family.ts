import { FamilyMember } from "./family-member";
import { Children } from './child';

export interface Family {
  id: number;
  name: string;
  members: FamilyMember[];
  children: Children[];
}

export interface FamilyResponse {
  total: number;
  limit: number;
  offset: number;
  totalPages: number;
  currentPage: number;
  families: Family[]; // Aqui é um array de famílias!
}

// export const family: Family[] = [
//   { id: 1, name: 'Paulo' },
//   { id: 2, name: 'Souza' },
//   { id: 3, name: 'Augusto' }
// ];
