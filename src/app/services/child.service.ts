import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Child } from '../api/interfaces/child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private apiMyapp = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getAllChild() {
    return this.http.get<Child[]>(`${this.apiMyapp}/children`);
  }

  getChildById( id: number ) {
    return this.http.get<Child[]>(`${this.apiMyapp}/children/${id}`);
  }

  createChild( child: Child ) {
    return this.http.post(`${this.apiMyapp}/children`, child);
  }

  updateChild( id: number, child: Child) {
    return this.http.put(`${this.apiMyapp}/children/${id}`, child);
  }

  deleteChild( id: number ) {
    return this.http.delete(`${this.apiMyapp}/children/${id}`);
  }
}
