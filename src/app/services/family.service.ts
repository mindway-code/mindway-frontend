
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Family, FamilyResponse } from '../api/interfaces/family';


export interface Parent {
  id: number;
  name: string;
}

export interface Child {
  id: number;
  name: string;
  age: number;
}

export interface Family1 {
  id: number;
  parents: Parent[];
  children: Child[];
}

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  private families: Family1[] = [
    {
      id: 1,
      parents: [ { id: 1, name: 'Maria Silva' } ],
      children: [ { id: 1, name: 'João Silva', age: 5 } ]
    },
    {
      id: 2,
      parents: [ { id: 2, name: 'Carlos Souza' }, { id: 3, name: 'Ana Souza' } ],
      children: [ { id: 2, name: 'Lara Souza', age: 4 }, { id: 3, name: 'Pedro Souza', age: 7 } ]
    }
  ];

  private apiMyapp = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  private nextId = 3;

  getFamily(limit: number = 20, offset: number = 0): Observable<FamilyResponse>  {
    let params = `?limit=${limit}&offset=${offset}`;

    return this.http.get<FamilyResponse>(`${this.apiMyapp}/families${params}` );
  }

  getFamilyById(id: number) {
    return this.http.get<Family[]>(`${this.apiMyapp}/families/${id}`);
  }

  createFamily(family: Family) {
    return this.http.post(`${this.apiMyapp}/families`,family);
  }

  updateFamily(id: number, family: Family) {
    return this.http.put(`${this.apiMyapp}/families/${id}`, family);
  }

  deleteFamily(id: number) {
    return this.http.delete(`${this.apiMyapp}/families/${id}`);
  }

  /** Retorna todas as famílias */
  getAll(): Observable<Family1[]> {
    return of(this.families).pipe(delay(300)); // simula latência
  }

  /** Cria uma nova família */
  create(family: Omit<Family1, 'id'>): Observable<Family1> {
    const newFamily: Family1 = {
      id: this.nextId++,
      parents: family.parents.map((p, idx) => ({ id: Date.now() + idx, name: p.name })),
      children: family.children.map((c, idx) => ({ id: Date.now() + idx + 100, name: c.name, age: c.age }))
    };
    this.families.push(newFamily);
    return of(newFamily).pipe(delay(300));
  }

  /** Atualiza família existente */
  update(id: number, changes: Omit<Family1, 'id'>): Observable<Family1> {
    const index = this.families.findIndex(f => f.id === id);
    if (index > -1) {
      this.families[index] = { id, ...changes };
      return of(this.families[index]).pipe(delay(300));
    }
    throw new Error('Family not found');
  }

  /** Remove família pelo id */
  delete(id: number): Observable<void> {
    this.families = this.families.filter(f => f.id !== id);
    return of(undefined).pipe(delay(300));
  }

  /** Busca família por id (opcional) */
  getById(id: number): Observable<Family1 | undefined> {
    const fam = this.families.find(f => f.id === id);
    return of(fam).pipe(delay(300));
  }
}
