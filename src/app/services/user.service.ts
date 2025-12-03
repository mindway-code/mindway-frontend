import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../api/interfaces/user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface UserPage {
  totalPages: number;
  totalUsers: number;
  currentPage: number;
  pageSize: number;
  users: User[];
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiMyapp = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getPacientes(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiMyapp}users`);
  }

  searchAllUsersByName(term: string, page: number, pageSize: number): Observable<User[]> {
    let params = new HttpParams()
      .set('name', term)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<User[]>(`${this.apiMyapp}try/search-all`, { params });
  }

  getUser() {
    return this.http.get<User[]>(`${this.apiMyapp}users`);
  }

  getUsers(page = 1, pageSize: number): Observable<UserPage> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<UserPage>(`${this.apiMyapp}users`, { params });
  }

  searchUsersByName(term: string, page: number, pageSize: number): Observable<UserPage> {
    let params = new HttpParams()
      .set('name', term)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<UserPage>(`${this.apiMyapp}users`, { params });
  }

  getPaginatedUsers(page: number = 1) {
    return this.http.get<any>(`${this.apiMyapp}searchUser?page=${page}`);
  }


  createUser(user: User) {
    return this.http.post(`${this.apiMyapp}users`,user);
  }

  updateUser(id: string, user: User) {
    return this.http.put(`${this.apiMyapp}users/${id}`,user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiMyapp}users/${id}`);
  }
}
