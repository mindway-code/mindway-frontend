// pages/history/history.component.ts

import { Component, OnInit } from '@angular/core';

interface HistoryItem {
  id: number;
  paciente: string;
  data: string;    // ISO date string
  resumo: string;
}

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  /** termo de busca */
  searchTerm = '';

  /** filtros de data */
  startDate!: string;
  endDate!: string;

  /** lista de atendimentos (mock) */
  historyList: HistoryItem[] = [
    {
      id: 1,
      paciente: 'João Silva',
      data: '2025-02-15',
      resumo: 'Progresso nas áreas de linguagem e habilidades motoras.'
    },
    {
      id: 2,
      paciente: 'Ana Silva',
      data: '2025-02-22',
      resumo: 'Avanços na interação social e comunicação não-verbal.'
    },
    {
      id: 3,
      paciente: 'Carlos Silva',
      data: '2025-03-05',
      resumo: 'Melhoria no foco e habilidades de resolução de problemas.'
    },
    // mais itens...
  ];

  constructor() {}

  ngOnInit(): void {
    // Aqui você pode, por exemplo, chamar um serviço para carregar o histórico real
  }

  /**
   * Retorna apenas os itens que correspondem ao termo de busca e intervalo de datas
   */
  filteredHistory(): HistoryItem[] {
    return this.historyList.filter(item => {
      const textMatch = item.paciente
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const date = new Date(item.data);
      const afterStart = this.startDate
        ? date >= new Date(this.startDate)
        : true;
      const beforeEnd = this.endDate
        ? date <= new Date(this.endDate)
        : true;

      return textMatch && afterStart && beforeEnd;
    });
  }
}
