import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../api/interfaces/user';

export interface Attendance {
  id: number;
  therapist: User;
  user: User;
  started_at: string | null;
  ended_at: string | null;
  summary: string | null;
  created_at: string;
  updated_at: string;
}

export interface AttendanceListResponse {
  data: Attendance[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiMyapp = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  // LISTAR
  getAttendances(filters?: any): Observable<AttendanceListResponse> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach((key) => {
        const val = filters[key];
        if (val !== null && val !== undefined) {
          params = params.append(key, val);
        }
      });
    }

    return this.http.get<AttendanceListResponse>(`${this.apiMyapp}attendances`, { params });
  }

  // BUSCAR POR USER ID
  getByUserId(): Observable<AttendanceListResponse> {
    return this.http.get<AttendanceListResponse>(`${this.apiMyapp}attendances_user`);
  }

  // BUSCAR TAREFAS POR USER ID
  getTasksByUserId(): Observable<AttendanceListResponse> {
    return this.http.get<AttendanceListResponse>(`${this.apiMyapp}attendances_user/tasks`);
  }

  // BUSCAR POR ID
  getById(id: number): Observable<Attendance> {
    return this.http.get<Attendance>(`${this.apiMyapp}attendances/${id}`);
  }

  // CRIAR
  create(payload: any): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiMyapp}attendances`, payload);
  }

  // ATUALIZAR
  update(id: number, payload: any): Observable<Attendance> {
    return this.http.put<Attendance>(`${this.apiMyapp}attendances/${id}`, payload);
  }

  // DELETAR
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiMyapp}attendances/${id}`);
  }
}
