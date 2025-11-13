import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../api/interfaces/user';

export interface Appointment {
  id: number;
  patient_id: string;
  provider_id: string;
  date: string;     // 'YYYY-MM-DD'
  time: string;     // 'HH:mm'
  status: string;
  notes?: string;
  patient?: User;
  provider?: User;
}

export interface AppointmentPage {
  data: Appointment[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = `${environment.apiBaseUrl}appointments`;
  getAppointmentsByPatient: any;

  constructor(private http: HttpClient) {}

  getAppointments(page = 1, pageSize = 10): Observable<AppointmentPage> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<AppointmentPage>(`${this.apiUrl}/index`, { params });
  }

  getAppointmentsByUser(
    page = 1,
    pageSize = 10,
    date: string = ''
  ): Observable<AppointmentPage> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
      if (date) params = params.set('date', date);
    return this.http.get<AppointmentPage>(`${this.apiUrl}/patient`, { params });
  }

  getAppointmentsByTherapist(
    page = 1,
    pageSize = 10,
    name: string = '',
    date: string = ''
  ): Observable<AppointmentPage> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    if (name) params = params.set('name', name);
    if (date) params = params.set('date', date);
    return this.http.get<AppointmentPage>(`${this.apiUrl}/therapist`, { params });
  }

  getAppointmentsByDate(date: string, page = 1, pageSize = 10): Observable<AppointmentPage> {
    let params = new HttpParams()
      .set('date', date)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<AppointmentPage>(`${this.apiUrl}/date`, { params });
  }

  getAppointmentsByTherapistAndDate(therapistId: string, date: string): Observable<{ data: Appointment[] }> {
    let params = new HttpParams()
      .set('therapist_id', therapistId)
      .set('date', date);
    return this.http.get<{ data: Appointment[] }>(`${this.apiUrl}/therapist-date`, { params });
  }

  createAppointment(data: Partial<Appointment>): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/create`, data);
  }

  updateAppointment(id: number, data: Partial<Appointment>): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, data);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
