import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


export interface TherapistChildren {
  id?: number;
  therapist_id: string;
  child_id: number;
  therapist: {
    id: string;
    name: string;
    email: string;
    surname: string;
  }
  child: {
    id: number;
    name: string;
    surname: string;
    age: number;
    family: {
      id: number;
      name: string;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class TherapistChildrenService {

  constructor(private http: HttpClient) { }


  private apiMyapp = `${environment.apiBaseUrl}`;

  getTherapistChildren(): Observable<TherapistChildren[]> {
    return this.http.get<TherapistChildren[]>(`${this.apiMyapp}/therapist-children`);
  }

  getTherapistChildrenByUser(): Observable<TherapistChildren[]> {
    return this.http.get<TherapistChildren[]>(`${this.apiMyapp}/therapist-children/user`);
  }

  createTherapistChildren(therapist_id: string, child_id: number) {
    return this.http.post(`${this.apiMyapp}/therapist-children`, { therapist_id, child_id });
  }

  updateTherapistChildren(id: number, therapist_id: string, child_id: number) {
    return this.http.put(`${this.apiMyapp}/therapist-children/${id}`, { therapist_id, child_id });
  }

  deleteTherapistChildren(id: number) {
    return this.http.delete(`${this.apiMyapp}/therapist-children/${id}`);
  }
}
