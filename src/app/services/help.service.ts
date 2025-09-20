import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface FAQ {
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  // Mock de FAQs
  private mockFaqs: FAQ[] = [
    {
      question: 'Como cadastro um novo paciente?',
      answer: 'Para cadastrar um novo paciente, vá até a seção "Família" e clique em "Adicionar Criança". Preencha os dados necessários e salve.'
    },
    {
      question: 'Como programo uma sessão no calendário?',
      answer: 'Na aba "Agenda", clique no dia desejado e depois em "Nova Sessão". Informe data, horário e observações, e confirme.'
    },
    {
      question: 'Esqueci minha senha, como recupero?',
      answer: 'Na página de login, clique em "Esqueceu a senha?" e siga as instruções enviadas por e-mail.'
    },
    {
      question: 'Como ajusto minhas preferências de notificação?',
      answer: 'No menu "Meu Perfil", clique em "Preferências de Perfil" e configure notificações de e-mail e push.'
    }
  ];

  constructor() {}

  /**
   * Retorna lista de FAQs (mock)
   */
  getFaqs(): Observable<FAQ[]> {
    return of(this.mockFaqs);
  }
}
