import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relation',
  standalone: false,
  templateUrl: './relation.component.html',
  styleUrl: './relation.component.scss'
})

export class RelationComponent implements OnInit {

  // Lista de relatos (pode ser carregada de um serviço ou API)
  relatos = [
    {
      id: 1,
      titulo: 'Progresso na Linguagem',
      resumo: 'A criança teve avanços significativos na capacidade de expressão verbal.',
      data: new Date('2025-02-15')
    },
    {
      id: 2,
      titulo: 'Interação Social Melhorada',
      resumo: 'Notou-se melhoria nas interações sociais durante as sessões.',
      data: new Date('2025-02-22')
    },
    {
      id: 3,
      titulo: 'Habilidades Motoras',
      resumo: 'A criança demonstrou maior coordenação motora durante atividades de terapia.',
      data: new Date('2025-03-05')
    }
  ];

  // Variáveis para controlar a criação de relato
  isCreating: boolean = false;
  newRelato = {
    titulo: '',
    resumo: '',
    detalhes: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  // Função para exibir detalhes do relato (ou redirecionar para uma página de detalhes)
  viewDetails(relatoId: number): void {
    console.log('Ver detalhes do relato:', relatoId);
    // Aqui você pode implementar o redirecionamento ou abrir um modal com mais informações sobre o relato.
  }

  // Função para iniciar a criação de um novo relato
  createRelato(): void {
    this.isCreating = true;  // Exibe o modal para criação
  }

  // Função para cancelar a criação de relato
  cancelCreate(): void {
    this.isCreating = false;
    this.newRelato = { titulo: '', resumo: '', detalhes: '' };  // Limpar os campos do formulário
  }

  // Função para submeter o novo relato
  submitRelato(): void {
    // Aqui você pode adicionar a lógica para enviar o relato para o servidor
    console.log('Novo relato criado:', this.newRelato);

    // Após a criação, cancelamos o formulário e limpamos os dados
    this.isCreating = false;
    this.newRelato = { titulo: '', resumo: '', detalhes: '' };
  }

  searchTerm = '';

  filteredRelatos() {
    return this.relatos.filter(r =>
      r.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      r.resumo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
