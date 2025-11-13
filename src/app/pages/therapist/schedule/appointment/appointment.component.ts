import { Component, Input, OnInit } from '@angular/core';
import { Appointment, appointments } from '../../../../api/interfaces/appointment';
import { UserService } from '../../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var bootstrap: any;
@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit{
  pacientes: any[] = [];
  pacientesFiltrados: any[] = [];
  searchTerm = '';
  currentPage = 1;
  totalPages = 1;
  paginas: number[] = [];
  pacienteSelecionado: any;
  formAgendamento!: FormGroup;
  horarios: string[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.formAgendamento = this.fb.group({
      data: ['', Validators.required],
      hora: ['', Validators.required],
      // outros campos do agendamento
    });
  }

  ngOnInit() {
    this.carregarPacientes();
    this.gerarHorarios();
  }

  abrirAgendamento(userId: string) {
    // Busca o paciente na lista
    this.pacienteSelecionado = this.pacientes.find(p => p.id === userId);

    // Reseta o form se quiser
    this.formAgendamento.reset();

    // Abre o modal (Bootstrap 5)
    const myModal = new bootstrap.Modal(document.getElementById('agendamentoModal'));
    myModal.show();
  }

  salvarAgendamento() {
    if (this.formAgendamento.valid) {
      const agendamento = {
        ...this.formAgendamento.value,
        patient_id: this.pacienteSelecionado.id
      };
      // Aqui você envia para a API
      console.log('Agendamento salvo:', agendamento);
      // Feche o modal:
      const myModal = bootstrap.Modal.getInstance(document.getElementById('agendamentoModal'));
      myModal.hide();
      // Exiba um alerta/toast/sucesso...
    }
  }

  gerarHorarios() {
    const inicio = 9 * 60; // 09:00 em minutos
    const fim = 18 * 60;   // 18:00 em minutos
    const intervalo = 30;  // 30 minutos
    this.horarios = [];

    for (let min = inicio; min <= fim; min += intervalo) {
      const hora = Math.floor(min / 60).toString().padStart(2, '0');
      const minuto = (min % 60).toString().padStart(2, '0');
      this.horarios.push(`${hora}:${minuto}`);
    }
  }

  carregarPacientes(page = 1) {
    this.userService.getPaginatedUsers(page).subscribe({
      next: (res) => {
        this.pacientes = res.users;
        this.pacientesFiltrados = this.pacientes;
        this.currentPage = res.currentPage;
        this.totalPages = res.totalPages;
        this.paginas = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.filterPacientes();
      },
      error: (err) => {
        // trate o erro aqui
      }
    });
  }

  filterPacientes() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.pacientesFiltrados = this.pacientes;
      return;
    }
    this.pacientesFiltrados = this.pacientes.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.surname.toLowerCase().includes(term) ||
      p.email.toLowerCase().includes(term)
    );
  }

  mudarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.carregarPacientes(page);
    }
  }

}
