import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../api/interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiMyapp = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<User[]>(`${this.apiMyapp}users`);
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
