import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../api/interfaces/user';

export interface Message {
  id: number;
  social_network_id: number;
  user_id: string;
  content: string;
  created_at?: string;
  user?: User
  // outros campos se necessário
}

export interface MessagePage {
  data: Message[];
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
export class MessageService {
  private apiUrl = `${environment.apiBaseUrl}/messages`;

  constructor(private http: HttpClient) {}

  /** Lista mensagens por socialNetworkId (paginado) */
  getMessages(socialNetworkId: number, page = 1, pageSize = 20): Observable<MessagePage> {
    let params = new HttpParams()
      .set('socialNetworkId', socialNetworkId)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<MessagePage>(this.apiUrl, { params });
  }

  /** Envia mensagem */
  sendMessage(social_network_id: number, user_id: string, content: string): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, { social_network_id, user_id, content });
  }

  /** Exclui mensagem por id */
  deleteMessage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
