import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'cluster';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiMyapp = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getAllAddress() {
    return this.http.get<Address[]>(`${this.apiMyapp}/addresses`);
  }

  getAddressById( id: number ) {
    return this.http.get<Address[]>(`${this.apiMyapp}/addresses/${id}`);
  }

  createAddress( address: Address ) {
    return this.http.post(`${this.apiMyapp}/addresses`, address);
  }

  updateAddress( id: number, address: Address) {
    return this.http.put(`${this.apiMyapp}/addresses/${id}`, address);
  }

  deleteAddress( id: number ) {
    return this.http.delete(`${this.apiMyapp}/addresses/${id}`);
  }
}
