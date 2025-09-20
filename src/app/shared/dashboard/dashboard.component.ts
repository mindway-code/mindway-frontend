import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  // Dados do Dashboard
  recentSessionsCount: number = 0; // Contagem de atendimentos recentes
  recentReportsCount: number = 0;  // Contagem de relatos recentes dos pais
  pendingTasksCount: number = 0;   // Contagem de tarefas pendentes
  guideCount: number = 0;          // Contagem de guias de acompanhamento

  constructor() { }

  ngOnInit(): void {
    // Aqui você pode fazer chamadas HTTP para buscar os dados do servidor.
    // Vou simular a obtenção de dados com valores fictícios para o exemplo.

    this.fetchDashboardData();
  }

  // Simulando a obtenção dos dados
  fetchDashboardData(): void {
    // Aqui você pode substituir por uma chamada real à API para buscar os dados
    setTimeout(() => {
      this.recentSessionsCount = 5;  // Exemplo: 5 atendimentos recentes
      this.recentReportsCount = 10;  // Exemplo: 10 relatos recentes
      this.pendingTasksCount = 3;    // Exemplo: 3 tarefas pendentes
      this.guideCount = 4;           // Exemplo: 4 guias de acompanhamento disponíveis
    }, 1000); // Simulando um atraso da API (1 segundo)
  }

}
