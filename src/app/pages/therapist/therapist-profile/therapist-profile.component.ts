import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-therapist-profile',
  standalone: false,
  templateUrl: './therapist-profile.component.html',
  styleUrl: './therapist-profile.component.scss'
})
export class TherapistProfileComponent implements OnInit {
  activeComponent: string = 'information'; // Começa com 'information' como padrão
  static classStyle: string = 'profile';

  constructor(private auth: AuthService) {}

  setActiveComponent(component: string) {
    this.activeComponent = component;
  }

  ngOnInit(): void {

  }


}
