// import { Component, OnInit } from '@angular/core';
// import { AgendamentoCardComponent } from '../agendamento-card/agendamento-card.component';

// @Component({
//   selector: 'app-agendamento',
//   templateUrl: './agendamento.component.html',
//   styleUrls: ['./agendamento.component.css']
// })
// export class AgendamentoComponent implements OnInit {
//   diasDoMes: string[] = [];
//   agendamentosAgrupados: { [data: string]: any[] } = {};

//   ngOnInit() {
//     const todosAgendamentos = AgendamentoCardComponent.agendamentos;

//     // Agrupar agendamentos por data
//     this.agendamentosAgrupados = todosAgendamentos.reduce((grupos, agendamento) => {
//       if (!grupos[agendamento.data]) {
//         grupos[agendamento.data] = [];
//       }
//       grupos[agendamento.data].push(agendamento);
//       return grupos;
//     }, {} as { [data: string]: any[] });

//     // Gerar todos os dias do mês atual (exemplo: abril de 2025)
//     const ano = 2025;
//     const mes = 3; // Abril (lembrando: janeiro = 0)

//     const primeiroDia = new Date(ano, mes, 1);
//     const ultimoDia = new Date(ano, mes + 1, 0);
//     //ele pega o somatório dos elementos para gerar o dia,
//     // então para achar o último, basta encontrar o dia 0 do
//     // mes + 1 que o Js se encarrega de pegar último dia do mes

//     for (let dia = primeiroDia.getDate(); dia <= ultimoDia.getDate(); dia++) {
//       const data = new Date(ano, mes, dia);
//       const dataFormatada = data.toISOString().split('T')[0]; // '2025-04-01'
//       this.diasDoMes.push(dataFormatada);
//     }
//   }
// }

[
  "2025":
  [
    "Abril":
    [
      "2025-05-01": [
          {
              "id": 1,
              "date": "2025-05-01",
              "time": "09:00",
              "child": {
                  "id": 1,
                  "name": "João Silva",
                  "user_id": 10
              },
              "type": {
                  "id": 1,
                  "name": "Terapia Cognitiva"
              },
              "description": "Foco em linguagem"
          },
          {
              "id": 2,
              "date": "2025-05-01",
              "time": "11:00",
              "child": {
                  "id": 2,
                  "name": "Ana Santos",
                  "user_id": 10
              },
              "type": {
                  "id": 2,
                  "name": "Terapia Ocupacional"
              },
              "description": "Exercícios sensoriais"
          }
      ],
      "2025-05-02": [
          {
              "id": 3,
              "date": "2025-05-02",
              "time": "14:30",
              "child": {
                  "id": 3,
                  "name": "Carlos Souza",
                  "user_id": 11
              },
              "type": {
                  "id": 3,
                  "name": "Intervenção Precoce"
              },
              "description": "Atividades motoras"
          }
      ],
      "2025-05-03": [
          {
              "id": 4,
              "date": "2025-05-03",
              "time": "10:00",
              "child": {
                  "id": 4,
                  "name": "Mariana Costa",
                  "user_id": 12
              },
              "type": {
                  "id": 4,
                  "name": "Comunicação Alternativa"
              },
              "description": "Uso de pictogramas"
          }
      ]
    ]
  ]
]

