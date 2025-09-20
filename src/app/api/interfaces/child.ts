import {  Family } from "./family";


export interface Children {
  id: number;
  name: string;
  surname: string;
  age: number;
  family?: Family;
}

export interface Child {
  id: number;
  name: string;
  surname: string;
  age: number;
  family: Family;
}

export interface Child1 {
  id: number;
  name: string;
  user_id: number;
}

// export const children: Child[] = [
//   { id: 1, name: 'João', surname: 'Paulo', age: 8, family: family[0] },
//   { id: 2, name: 'Pedro', surname: 'Paulo', age: 10, family: family[0] },
//   { id: 3, name: 'João', surname: 'Augusto', age: 7, family: family[0] },
//   { id: 4, name: 'Lara', surname: 'Souza', age: 9, family: family[1] }
// ];
