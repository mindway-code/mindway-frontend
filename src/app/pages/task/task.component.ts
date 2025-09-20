import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  // Lista de tarefas (aqui são mockadas, mas você pode substituir com dados da API)
  tarefas = [
    {
      id: 1,
      titulo: 'Praticar Linguagem',
      descricao: 'Realizar atividade de leitura e escrita com a criança.',
      dataVencimento: new Date('2025-04-30'),
      concluida: false
    },
    {
      id: 2,
      titulo: 'Desenvolver Habilidades Motoras',
      descricao: 'Atividades de coordenação motora e movimentos de precisão.',
      dataVencimento: new Date('2025-05-02'),
      concluida: false
    },
    {
      id: 3,
      titulo: 'Exercícios de Socialização',
      descricao: 'Brincadeiras para melhorar a interação social com outras crianças.',
      dataVencimento: new Date('2025-05-05'),
      concluida: true
    }
  ];

  // Variáveis para controle de criação de nova tarefa
  isCreating = false;
  newTask = {
    titulo: '',
    descricao: '',
    dataVencimento: '',
    concluida: false
  };

  constructor() { }

  ngOnInit(): void {
  }

  // Função para exibir detalhes de uma tarefa
  viewDetails(taskId: number): void {
    console.log('Detalhes da tarefa:', taskId);
    // Aqui você pode redirecionar para uma página de detalhes ou abrir um modal
  }

  // Função para alternar o status da tarefa entre concluída e pendente
  toggleConcluida(tarefa: any): void {
    tarefa.concluida = !tarefa.concluida;
  }

  // Função para iniciar a criação de uma nova tarefa
  createTask(): void {
    this.isCreating = true;
  }

  // Função para cancelar a criação de uma tarefa
  cancelCreate(): void {
    this.isCreating = false;
    this.newTask = { titulo: '', descricao: '', dataVencimento: '', concluida: false }; // Limpar o formulário
  }

  // Função para submeter a nova tarefa
  submitTask(): void {
    if (this.newTask.titulo && this.newTask.descricao && this.newTask.dataVencimento) {
      // Adiciona a nova tarefa à lista de tarefas
      this.tarefas.push({
        id: this.tarefas.length + 1,
        titulo: this.newTask.titulo,
        descricao: this.newTask.descricao,
        dataVencimento: new Date(this.newTask.dataVencimento),
        concluida: this.newTask.concluida
      });

      // Após salvar, fecha o formulário e limpa os dados
      this.isCreating = false;
      this.newTask = { titulo: '', descricao: '', dataVencimento: '', concluida: false };
    } else {
      console.log('Todos os campos são obrigatórios!');
    }
  }

  searchTerm = '';
  filter: 'all'|'pending'|'completed' = 'all';

  filteredTarefas() {
    return this.tarefas
      .filter(t =>
        t.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.descricao.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .filter(t =>
        this.filter === 'all' ||
        (this.filter === 'pending' && !t.concluida && new Date(t.dataVencimento) >= new Date()) ||
        (this.filter === 'completed' && t.concluida) ||
        (this.filter === 'pending' && new Date(t.dataVencimento) < new Date() && !t.concluida) // overdue
      );
  }

  statusBadgeClass(tarefa: any) {
    if (tarefa.concluida) return 'badge-completed';
    if (new Date(tarefa.dataVencimento) < new Date()) return 'badge-overdue';
    return 'badge-pending';
  }

  statusBadgeText(tarefa: any) {
    if (tarefa.concluida) return 'Concluída';
    if (new Date(tarefa.dataVencimento) < new Date()) return 'Vencida';
    return 'Pendente';
  }

}
