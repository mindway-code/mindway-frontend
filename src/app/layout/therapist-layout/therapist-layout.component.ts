import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TherapistProfileComponent } from '../../pages/therapist/therapist-profile/therapist-profile.component';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-therapist-layout',
  standalone: false,
  templateUrl: './therapist-layout.component.html',
  styleUrls: ['./therapist-layout.component.scss']
})
export class TherapistLayoutComponent {

  classStyle: string = TherapistProfileComponent.classStyle;
  mobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  menuItems: MenuItem[] = [
    { label: 'Clientes',     link: '/therapist/association',    icon: 'bi bi-people'  },
    { label: 'Agenda',    link: '/therapist/schedule', icon: 'bi bi-calendar2'    },
    { label: 'Rede de Apoio',   link: '/social-network',   icon: 'bi bi-people-fill'  },
    { label: 'Atendimentos',   link: '/therapist/attendance',   icon: 'bi bi-clipboard-check'  },
  ];

  setClass(classes: string) {
    this.classStyle = classes;
    console.log(this.classStyle);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  exit() {
    // this.authService.logout();
    this.router.navigate(['/']);
  }
}
