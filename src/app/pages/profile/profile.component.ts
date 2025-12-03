import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  cards = [
    {
      title: 'Informações Pessoais',
      text: 'Ver e editar seus dados de contato e perfil.',
      icon: 'bi bi-person-circle',
      link: '/personal/edit-profile',
      button: 'Editar Perfil'
    },
    // {
    //   title: 'Filhos Cadastrados',
    //   text: 'Caio Silva, 5 anos , Alice Silva, 3 anos',
    //   icon: 'bi bi-person-arms-up',
    //   link: '/personal/children',
    //   button: 'Ver Detalhes'
    // },
    {
      title: 'Histórico de Atendimentos',
      text: 'Todos os atendimentos e progresso.',
      icon: 'bi bi-calendar-check',
      link: '/personal/history',
      button: 'Ver Histórico'
    },
    {
      title: 'Relatos Recentes',
      text: 'Relatos de progresso e observações.',
      icon: 'bi bi-pencil-square',
      link: '/personal/relation',
      button: 'Ver Relatos'
    },
    {
      title: 'Tarefas Pendentes',
      text: 'Acompanhe atividades recomendadas.',
      icon: 'bi bi-check-square',
      link: '/personal/task',
      button: 'Ver Tarefas'
    },
    {
      title: 'Notificações',
      text: 'Atualizações e lembretes recentes.',
      icon: 'bi bi-bell',
      link: '/personal/notification',
      button: 'Ver Notificações'
    }
  ];
  userName?: any;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.currentUser?.name;
   }

}
