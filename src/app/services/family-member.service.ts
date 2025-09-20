import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FamilyMember } from '../api/interfaces/family-member';

@Injectable({
  providedIn: 'root'
})
export class FamilyMemberService {

  private apiMyapp = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getAllFamilyMember( ) {
    return this.http.get<FamilyMember[]>(`${this.apiMyapp}/family-members`);
  }

  getFamilyMemberById( id: number ) {
    return this.http.get<FamilyMember[]>(`${this.apiMyapp}/family-members/${id}`);
  }

  createFamilyMember( familyMember: FamilyMember ) {
    return this.http.post(`${this.apiMyapp}/family-members`, familyMember);
  }

  updateFamilyMember( id: number, familyMember: FamilyMember ) {
    return this.http.put(`${this.apiMyapp}/family-members/${id}`, familyMember);
  }

  deleteFamilyMember( id: number ) {
    return this.http.delete(`${this.apiMyapp}/family-members/${id}`);
  }
}
