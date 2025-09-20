import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../api/interfaces/user';

interface NavItem {
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {}

  // menuItems: NavItem[] = [
  //   { label: 'Perfil',      link: '/personal/profile',    icon: 'bi bi-person-circle'  },
  //   { label: 'Histórico',   link: '/personal/history',    icon: 'bi bi-calendar-check' },
  //   { label: 'Relatos',     link: '/personal/relation',   icon: 'bi bi-pencil-square'  },
  //   { label: 'Tarefas',     link: '/personal/task',       icon: 'bi bi-check-square'   },
  //   { label: 'Notificações',link: '/personal/notification', icon: 'bi bi-bell'          },
  // ];

    therapist: NavItem[] = [
    { label: 'Nossos Parceiros',      link: '#',    icon: 'bi bi-person-bounding-box'  },
    { label: 'Últimas Novidades',      link: '#',    icon: 'bi bi-emoji-wink-fill'  },
    { label: 'Tutorial de Acesso',      link: '#',    icon: 'bi bi-book-half'  },
    { label: 'Grupos de apoio',      link: '#',    icon: 'bi bi-people-fill'  },
    { label: 'Área do Profissional',      link: '/therapist',    icon: 'bi bi-person-badge'  },
    { label: 'Área do Professor',      link: '/teacher',    icon: 'bi bi-people-fill'  },
  ];


  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    window.location.reload();
  }
}
