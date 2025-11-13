import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SocialNetwork {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  // outros campos, se necessário
}

export interface SocialNetworkPage {
  data: SocialNetwork[];
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
export class SocialNetworkService {
  private apiUrl = `${environment.apiBaseUrl}social-networks`;

  constructor(private http: HttpClient) {}

  /** Lista redes sociais com paginação */
  getSocialNetworks(page = 1, pageSize = 10): Observable<SocialNetworkPage> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<SocialNetworkPage>(this.apiUrl, { params });
  }

  /** Lista redes sociais com paginação do usuário*/
  getSocialNetworksByUser(page = 1, pageSize = 10): Observable<SocialNetworkPage> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<SocialNetworkPage>(this.apiUrl+'/user', { params });
  }

  /** Cria uma nova rede social */
  createSocialNetwork(data: Partial<SocialNetwork>): Observable<SocialNetwork> {
    return this.http.post<SocialNetwork>(this.apiUrl, data);
  }

  /** Cria uma nova rede social com o user logado */
  createSocialNetworkWithUser(data: Partial<SocialNetwork>): Observable<SocialNetwork> {
    return this.http.post<SocialNetwork>(this.apiUrl+'/user', data);
  }

  /** Atualiza uma rede social existente */
  updateSocialNetwork(id: number, data: Partial<SocialNetwork>): Observable<SocialNetwork> {
    return this.http.put<SocialNetwork>(`${this.apiUrl}/${id}`, data);
  }

  /** Remove uma rede social */
  deleteSocialNetwork(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
