import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Contact } from '../api/interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiMyapp = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getAllContact() {
    return this.http.get<Contact[]>(`${this.apiMyapp}/contacts`);
  }

  getContactById( id: number ) {
    return this.http.get<Contact[]>(`${this.apiMyapp}/contacts/${id}`);
  }

  createContact( contact: Contact ) {
    return this.http.post(`${this.apiMyapp}/contacts`, contact);
  }

  updateContact( id: number, contact: Contact) {
    return this.http.put(`${this.apiMyapp}/contacts/${id}`, contact);
  }

  deleteContact( id: number ) {
    return this.http.delete(`${this.apiMyapp}/contacts/${id}`);
  }
}
