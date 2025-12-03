import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../api/interfaces/user';

export interface Task {
  id: number;
  attendance_id: number;
  description: string;
  status: 'pending' | 'done' | string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface TaskAttendance {
  id: number;
  therapist?: User;
  user?: User;
  task: Task[];
}

export interface AttendanceTaskItemResponse {
  data: TaskAttendance[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
}

export interface TaskListResponse {
  data: Task[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiMyapp = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  // 🔹 Listar tasks (com filtros)
  getTasks(filters?: {
    attendance_id?: number;
    status?: string;
    page?: number;
    pageSize?: number;
  }): Observable<TaskListResponse> {
    let params = new HttpParams();

    if (filters) {
      Object.keys(filters).forEach(key => {
        const value: any = (filters as any)[key];
        if (value !== undefined && value !== null) {
          params = params.append(key, value);
        }
      });
    }

    return this.http.get<TaskListResponse>(`${this.apiMyapp}tasks`, { params });
  }

  // 🔹 Buscar task por ID
  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiMyapp}tasks/${id}`);
  }

  getTasksByUserId(): Observable<AttendanceTaskItemResponse> {
    return this.http.get<AttendanceTaskItemResponse>(`${this.apiMyapp}tasks_user`);
  }

  // 🔹 Criar task
  create(payload: {
    attendance_id: number;
    description: string;
    status?: string;
    due_date?: string;
  }): Observable<Task> {
    return this.http.post<Task>(`${this.apiMyapp}tasks`, payload);
  }

  // 🔹 Atualizar task
  update(id: number, payload: any): Observable<Task> {
    return this.http.put<Task>(`${this.apiMyapp}tasks/${id}`, payload);
  }

  // 🔹 Remover task
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiMyapp}tasks/${id}`);
  }
}
