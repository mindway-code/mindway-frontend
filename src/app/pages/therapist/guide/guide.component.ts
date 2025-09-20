import { Component, OnInit } from '@angular/core';

interface Guide {
  id: number;
  title: string;
  summary: string;
  route: string;
}

@Component({
  selector: 'app-guide',
  standalone: false,
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss'
})
export class GuideComponent implements OnInit {
  /** termo de busca */
  searchTerm = '';

  /** lista de guias disponíveis */
  guides: Guide[] = [
    { id: 1, title: 'Guia de Intervenção Precoce', summary: 'Estratégias para estimular habilidades iniciais.', route: '/therapist/guide/1' },
    { id: 2, title: 'Guia de Comunicação Alternativa', summary: 'Ferramentas para comunicação sem fala.', route: '/therapist/guide/2' },
    { id: 3, title: 'Guia de Atividades Sensoriais', summary: 'Exercícios para integrar os sentidos.', route: '/therapist/guide/3' },
    // ... outros guias
  ];

  filteredGuides(): Guide[] {
    const term = this.searchTerm.toLowerCase();
    return this.guides.filter(g =>
      g.title.toLowerCase().includes(term) ||
      g.summary.toLowerCase().includes(term)
    );
  }

  ngOnInit(): void { }

}
