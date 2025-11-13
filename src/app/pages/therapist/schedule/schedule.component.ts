import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { User } from '../../../api/interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { Appointment, AppointmentsService } from '../../../services/appointment.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-schedule',
  standalone: false,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  pacientes: any[] = [];
  appointments: Appointment[] = [];
  appointmentsMeta: any = null;
  appointmentForm: FormGroup;
  therapistId = '';
  loading = false;
  successMsg = '';
  errorMsg = '';
  currentPage = 1;
  nameFilter = '';
  dateFilter = '';

  selectedAppt: Appointment | null = null;
  showEditModal = false;
  editForm!: FormGroup;
  modalAction = ''; // 'edit' | 'confirm' | 'delete'
  loadingModal = false;
  errorModal = '';

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private appointmentsService: AppointmentsService
  ) {
    this.appointmentForm = this.fb.group({
      patient_id: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Recupera terapeuta logado
    this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user?.profile_id === 3) {
        this.therapistId = user.id!;
      }
    });
    this.loadAppointments();
  }

  loadPacientes() {
    this.userService.getUser().subscribe({
      next: (res) => {
        this.pacientes = Array.isArray(res) ? res : [res];
      console.log('Resposta do getUser:', this.pacientes);
      },
      error: (error) => {
        this.errorMsg = 'Erro ao carregar pacientes.'
        console.error('Error loading user:', error);
      }
    });
  }

  loadAppointments(page=1) {
    this.currentPage = page;
    this.appointmentsService.getAppointmentsByTherapist(
      page,
      4,
      this.nameFilter,
      this.dateFilter
    )
      .subscribe({
        next: apps => {
          this.appointments = apps.data;
          this.appointmentsMeta = apps.meta;
        },
        error: () => this.errorMsg = 'Erro ao carregar agendamentos.'
      });
  }



  onNameChange(event: any) {
    this.nameFilter = event.target.value;
    this.loadAppointments(1);
  }

  onDateChange(event: any) {
    this.dateFilter = event.target.value;
    this.loadAppointments(1);
  }


  getPacienteName(userId: string): string {
    const user = this.pacientes.find(u => u.id === userId);
    if (!user) return 'Paciente';
    return [user.name, user.surname].filter(Boolean).join(' ');
  }


  onSave() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload: Appointment = {
      ...this.appointmentForm.value,
      provider_id: this.therapistId
    };
    this.appointmentsService.createAppointment(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: app => {
          this.appointments.push(app);
          this.successMsg = 'Agendamento criado!';
          this.appointmentForm.reset();
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Erro ao criar agendamento.';
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  openEditModal(appt: Appointment) {
    this.selectedAppt = { ...appt };
    this.modalAction = 'edit';
    this.showEditModal = true;
    this.errorModal = '';
    this.editForm = this.fb.group({
      date: [appt.date, Validators.required],
      time: [appt.time, Validators.required],
      status: [appt.status, Validators.required],
      notes: [appt.notes || '']
    });
  }

  openConfirmModal(appt: Appointment) {
    this.selectedAppt = { ...appt };
    this.modalAction = 'confirm';
    this.showEditModal = true;
    this.errorModal = '';
  }

  openDeleteModal(appt: Appointment) {
    this.selectedAppt = { ...appt };
    this.modalAction = 'delete';
    this.showEditModal = true;
    this.errorModal = '';
  }

  closeModal() {
    this.showEditModal = false;
    this.selectedAppt = null;
    this.editForm?.reset();
  }

  submitEdit() {
    if (this.editForm.invalid || !this.selectedAppt) return;
    this.loadingModal = true;
    this.errorModal = '';
    this.appointmentsService.updateAppointment(this.selectedAppt.id, this.editForm.value)
      .subscribe({
        next: () => {
          this.loadingModal = false;
          this.closeModal();
          this.loadAppointments(this.currentPage);
        },
        error: err => {
          this.loadingModal = false;
          this.errorModal = err?.error?.error || 'Erro ao editar agendamento.';
        }
      });
  }

  submitConfirm() {
    if (!this.selectedAppt) return;
    this.loadingModal = true;
    this.errorModal = '';
    this.appointmentsService.updateAppointment(this.selectedAppt.id, { status: 'CONFIRMADO' })
      .subscribe({
        next: () => {
          this.loadingModal = false;
          this.closeModal();
          this.loadAppointments(this.currentPage);
        },
        error: err => {
          this.loadingModal = false;
          this.errorModal = err?.error?.error || 'Erro ao confirmar agendamento.';
        }
      });
  }

  submitDelete() {
    if (!this.selectedAppt) return;
    this.loadingModal = true;
    this.errorModal = '';
    this.appointmentsService.deleteAppointment(this.selectedAppt.id)
      .subscribe({
        next: () => {
          this.loadingModal = false;
          this.closeModal();
          this.loadAppointments(this.currentPage);
        },
        error: err => {
          this.loadingModal = false;
          this.errorModal = err?.error?.error || 'Erro ao cancelar agendamento.';
        }
      });
  }
}
