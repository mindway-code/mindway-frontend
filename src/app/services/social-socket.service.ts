// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor() {
    this.socket = io(this.apiUrl, {
      path: '/socket.io',
      transports: ['websocket'],
      withCredentials: true
    });
  }

  joinSocialNetwork(socialNetworkId: number, userId?: string, limit?: number, offset?: number) {
    this.socket.emit('joinSocialNetwork', { socialNetworkId, userId, limit, offset });
  }

  leaveSocialNetwork(socialNetworkId: number, userId: string) {
    this.socket.emit('leaveSocialNetwork', { socialNetworkId, userId });
  }

  sendMessage(socialNetworkId: number, userId?: string, content?: string) {
    this.socket.emit('message', { socialNetworkId, userId, content });
  }

  // RxJS Observables para eventos!
  onMessage(): Observable<any> {
    return fromEvent(this.socket, 'message');
  }

  onMessageHistory(): Observable<any[]> {
    return fromEvent(this.socket, 'messageHistory');
  }

  // (Opcional) outros eventos
  onJoinedSocialNetwork(): Observable<any> {
    return fromEvent(this.socket, 'joinedSocialNetwork');
  }

  disconnect() {
    this.socket.disconnect();
  }
}
