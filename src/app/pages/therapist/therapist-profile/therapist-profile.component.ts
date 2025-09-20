import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-therapist-profile',
  standalone: false,
  templateUrl: './therapist-profile.component.html',
  styleUrl: './therapist-profile.component.scss'
})
export class TherapistProfileComponent implements OnInit {
  activeComponent: string = 'information'; // Começa com 'information' como padrão
  static classStyle: string = 'profile';


  setActiveComponent(component: string) {
    this.activeComponent = component; // Atualiza o componente ativo com base na seleção
  }

  ngOnInit(): void {

  }


}
