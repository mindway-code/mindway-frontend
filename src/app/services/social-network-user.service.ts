import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SocialNetworkUser {
  id: number;
  social_network_id: number;
  user_id: string;
}

export interface SocialNetworkUserPage {
  data: SocialNetworkUser[];
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
export class SocialNetworkUserService {
  private apiUrl = `${environment.apiBaseUrl}social-network-users`;

  constructor(private http: HttpClient) {}

  /** Lista membros da rede (com paginação e filtro por socialNetworkId) */
  getMembers(socialNetworkId: number, page = 1, pageSize = 10): Observable<SocialNetworkUserPage> {
    let params = new HttpParams()
      .set('socialNetworkId', socialNetworkId)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<SocialNetworkUserPage>(this.apiUrl, { params });
  }

  /** Adiciona usuário a uma rede */
  addMember(social_network_id: number, user_id: string): Observable<SocialNetworkUser> {
    return this.http.post<SocialNetworkUser>(this.apiUrl, { social_network_id, user_id });
  }

  /** Remove usuário da rede (por id da associação) */
  removeMember(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
