import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TherapistFamiliesService {

  constructor(private http: HttpClient) { }

  private apiMyapp = `${environment.apiBaseUrl}`;

  getTherapistFamilies() {
    return this.http.get(`${this.apiMyapp}/therapists-families`);
  }
  getTherapistFamiliesById() {
    return this.http.get(`${this.apiMyapp}/therapists-families/user`);
  }
  createTherapistFamilies(therapist_id: string, family_id: number) {
    return this.http.post(`${this.apiMyapp}/therapists-families`, { therapist_id, family_id });
  }
  updateTherapistFamilies(id: number, therapist_id: string, family_id: number) {
    return this.http.put(`${this.apiMyapp}/therapists-families/${id}`, { therapist_id, family_id });
  }
  deleteTherapistFamilies(id: number) {
    return this.http.delete(`${this.apiMyapp}/therapists-families/${id}`);
  }
}
