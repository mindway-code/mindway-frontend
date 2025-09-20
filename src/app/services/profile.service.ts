import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Profile } from '../api/interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiMyapp = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getAllProfile() {
    return this.http.get<Profile[]>(`${this.apiMyapp}/profiles`);
  }

  getProfileById( id: number ) {
    return this.http.get<Profile[]>(`${this.apiMyapp}/profiles/${id}`);
  }

  createProfile( profile: Profile ) {
    return this.http.post(`${this.apiMyapp}/profiles`, profile);
  }

  updateProfile( id: number, profile: Profile) {
    return this.http.put(`${this.apiMyapp}/profiles/${id}`, profile);
  }

  deleteProfile( id: number ) {
    return this.http.delete(`${this.apiMyapp}/profiles/${id}`);
  }
}
