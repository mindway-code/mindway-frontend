import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../api/interfaces/user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
  private tokenKey = 'token';
  private apiUrl = `${environment.apiBaseUrl}`;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  public isAuthenticated$ = this.user$.pipe(
    map(user => !!user)
  );
  public user!: User;

  constructor(private http: HttpClient,
    private router: Router
  ) {
      this.recoverToken();
   }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get currentUser(): User | null {
    return this.userSubject.getValue();
  }

  get currentUserId(): string | undefined {
    return this.userSubject.getValue()?.id;
  }

  restoreUserFromToken(): void {
    const token = this.token;
    if (token) {
      this.getMe().subscribe({
        next: user => this.userSubject.next(user),
        error: () => this.logout()
      });
    } else {
      this.userSubject.next(null);
    }
  }

  recoverToken() {
    const token = localStorage.getItem(this.tokenKey);

    try {
      if (token) {
        const payload = jwtDecode<{ id: string; name: string; avatar?: string; profile_id?: number }>(token);
        this.userSubject.next({
          id: payload.id,
          name: payload.name,
          profile_id: payload.profile_id
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  isLoggedCheck(): boolean {
    const t = this.token;
    if (!t) return false;

    try {
      const {exp} = jwtDecode<JwtPayload>(t);
      const isValid = Date.now() < exp * 1000;

      if (!isValid) {
        this.clearToken();
      }

      return isValid;
    } catch (error) {
      this.clearToken();
      return false;
    }
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
    return this.http.post<Response>(`${this.apiUrl}login`, { email, password });
  }

  register ( name: string,  surname: string, email: string, password: string, confirmPassword: string ): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}register`, { email, password, name, surname, confirmPassword });
  }

  saveToken ( token: string ): void {
    localStorage.setItem(this.tokenKey, token);

    try {
        const payload = jwtDecode<{ id: string; name: string; avatar?: string; profile_id?: number }>(token);
        this.userSubject.next({
          id: payload.id,
          name: payload.name,
          profile_id: payload.profile_id
        });

    } catch (error) {
      console.log(error)
    }
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}me`);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  private clearToken(): void {
    localStorage.removeItem('token');
  }

  isTherapist(): Observable<any> {
    return this.http.get(`${this.apiUrl}auth/therapist`);
  }
}
