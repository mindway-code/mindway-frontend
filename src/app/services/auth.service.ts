import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../api/interfaces/user';

export interface JwtPayload {
  exp: number;
}

export interface Response {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token'; //
  private apiUrl = 'http://localhost:3333'; // URL base da API
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLogged(): boolean {
    const t = this.token;
    if (!t) {
      return false;
    }
    try{
      const {exp} = jwtDecode<JwtPayload>(t);
      return Date.now() < exp * 1000;

    }
    catch (error) {
      return false;
    }
  }

  login ( email: string, password: string ): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/login`, { email, password });
  }

  register ( name: string,  surname: string, email: string, password: string ): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/register`, { email, password, name, surname });
  }

  saveToken ( token: string ): void {
    localStorage.setItem(this.tokenKey, token);
    const payload = jwtDecode<{ id: string; name: string; avatar?: string }>(token);
    this.userSubject.next({
      name: payload.name
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isTherapist(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/therapist`);
  }
}
