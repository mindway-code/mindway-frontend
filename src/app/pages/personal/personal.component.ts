import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-personal',
  standalone: false,
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})

export class PersonalComponent implements OnInit {
  // Variáveis de controle para abrir os diálogos
  displayHistoric: boolean = false;
  displayReports: boolean = false;
  displayTasks: boolean = false;
  displayNotifications: boolean = false;
  userName!: string;

  // Informações do usuário (pode ser carregado de um serviço ou API)
  userRole: string = 'Pai de criança neurodivergente';
  userEmail: string = 'joao.silva@email.com';

  userSessions = [
    { date: '2025-04-12', therapistName: 'Dr. Maria', notes: 'Acompanhamento inicial de comportamento.' },
    { date: '2025-04-10', therapistName: 'Dr. Ana', notes: 'Observação sobre habilidades motoras.' },
  ];

  userReports = [
    { date: '2025-04-15', content: 'Relato sobre atividades de interação social.' },
    { date: '2025-04-14', content: 'Relato sobre progresso nas tarefas de autonomia.' },
  ];

  userTasks = [
    { title: 'Tarefa 1: Exercícios de Fala', description: 'Praticar vocabulário e expressões faciais', status: 'Concluído' },
    { title: 'Tarefa 2: Desafios de Coordenação Motora', description: 'Trabalhar atividades de coordenação', status: 'Em progresso' },
  ];

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.currentUser?.name || 'Usuário';
   }

  editProfile() {
    // Método para permitir que o usuário edite seu perfil
    console.log('Abrir edição de perfil');
  }

  openModal(dialog: boolean){
    dialog = true;
  }
}
