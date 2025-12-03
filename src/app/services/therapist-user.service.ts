import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Therapist {
  id: string;
  name: string;
  surname?: string;
  specialty?: string;
  avatar?: string;
  email?: string;
  // outros campos conforme seu model
}

@Injectable({
  providedIn: 'root'
})
export class TherapistUserService {
  private apiUrl = `${environment.apiBaseUrl}therapist-users`;

  constructor(private http: HttpClient) {}

  getAssociatedUsers(): Observable<Therapist[]> {
    return this.http.get<Therapist[]>(`${this.apiUrl}/associated/therapist`);
  }

  getAssociatedTherapists(): Observable<Therapist[]> {
    return this.http.get<Therapist[]>(`${this.apiUrl}/associated`);
  }

  associateUserToTherapist(user_id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { user_id });
  }

}
