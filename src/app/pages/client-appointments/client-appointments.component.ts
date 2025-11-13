import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../api/interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment, AppointmentPage, AppointmentsService } from '../../services/appointment.service';
import { TherapistUserService } from '../../services/therapist-user.service';

@Component({
  selector: 'app-client-appointments',
  standalone: false,
  templateUrl: './client-appointments.component.html',
  styleUrl: './client-appointments.component.scss'
})
export class ClientAppointmentsComponent implements OnInit {

  @ViewChild('agendamentoSection') agendamentoSection!: ElementRef;

  info = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    therapist: null as any,
  };
  open: boolean = false;
  user!: User;
  showSteps = false;
  step = 1;
  totalSteps = 5;
  therapists: any[] = [];
  selectedTherapist: any = null;
  availableTimes: string[] = [];
  appointmentForm!: FormGroup;
  loading = false;
  appointmentsOfDay: any[] = [];
  errorMsg = '';
  baseTimes = ['08:00','09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00'];

  myAppointments: Appointment[] = [];

  selectedAppt: Appointment | null = null;
  showEditModal = false;
  editForm!: FormGroup;
  modalAction = ''; // 'edit' | 'confirm' | 'delete'
  loadingModal = false;
  errorModal = '';
  currentPage = 1;
  nameFilter = '';
  dateFilter = '';
  appointmentsMeta: any = null;
  openAppt: boolean = false;

  constructor(
    public authService: AuthService,
    private therapistUserService: TherapistUserService,
    private appointmentService: AppointmentsService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadMyAppointments();
    this.loadTherapists();
    this.appointmentForm = this.fb.group({
      patient_id: null,
      provider_id: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      status: ['PENDENTE'],
      note: ['']
    });
  }

  loadMyAppointments(page=1) {
    this.appointmentService.getAppointmentsByUser(
      page,
      3,
      this.dateFilter
    )
    .subscribe({
      next: (list) => {
        this.myAppointments = list.data;
          this.appointmentsMeta = list.meta;
      },

      error: () => this.errorMsg = 'Erro ao buscar agendamentos.'
    });
  }

  loadTherapists() {
    this.therapistUserService.getAssociatedTherapists().subscribe({
      next: list => this.therapists = list,
      error: () => this.errorMsg = 'Erro ao buscar terapeutas.'
    });
  }

  nextStep() {
    if (this.step === 1 && this.selectedTherapist) {
      this.appointmentForm.get('provider_id')?.setValue(this.selectedTherapist.id);
      this.step = 2;
    }
    else if (this.step === 2 && this.appointmentForm.get('date')?.valid && this.appointmentForm.get('time')?.valid) {
      this.step = 3;
    }
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  onSelectTherapist(therapist: any) {
    this.selectedTherapist = therapist;
    this.appointmentForm.get('provider_id')?.setValue(therapist.id);
    console.log(this.appointmentForm.value)
  }

  onDateChange() {
    // Carrega horários ocupados para aquela data/terapeuta
    const therapistId = this.appointmentForm.get('provider_id')?.value;
    const date = this.appointmentForm.get('date')?.value;
    if (therapistId && date) {
      this.loading = true;
      this.appointmentService.getAppointmentsByTherapistAndDate(therapistId, date).subscribe({
        next: result => {
          this.appointmentsOfDay = result.data || [];
          // Remove horários já ocupados
          const ocupados = this.appointmentsOfDay.map(a => a.time);
          this.availableTimes = this.baseTimes.filter(h => !ocupados.includes(h));
          this.loading = false;
        },
        error: () => {
          this.availableTimes = [];
          this.loading = false;
          this.errorMsg = 'Erro ao buscar horários.';
        }
      });
    } else {
      this.availableTimes = [];
    }
    // Limpa campo horário ao mudar data
    this.appointmentForm.get('time')?.setValue('');
  }

  submitAppointment() {
    if (this.appointmentForm.invalid) return;
    this.loading = true;
    this.errorMsg = '';
    console.log(this.appointmentForm.value)
    this.appointmentService.createAppointment(this.appointmentForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.step = 4;
      },
      error: (error) => {
        this.loading = false;
        this.errorMsg =
          'Erro ao agendar. Tente novamente.';
        console.error('Erro ao criar agendamento:', error);
      }
    });

  }

  goBack() {
    window.history.back()
  }


  scrollToAgendamento() {
    this.showSteps = true;
  }
  scrollBack() {
    this.showSteps = false;
  }

  openAppointments() {
    this.openAppt = true;
  }

  closeAppointments() {
    this.openAppt = false;
  }

  onNameChange(event: any) {
    this.nameFilter = event.target.value;
    this.loadMyAppointments(1);
  }

  dateChange(event: any) {
    this.dateFilter = event.target.value;
    this.loadMyAppointments(1);
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


  submitDelete() {
    if (!this.selectedAppt) return;
    this.loadingModal = true;
    this.errorModal = '';
    this.appointmentService.deleteAppointment(this.selectedAppt.id)
      .subscribe({
        next: () => {
          this.loadingModal = false;
          this.closeModal();
          this.loadMyAppointments(this.currentPage);
        },
        error: err => {
          this.loadingModal = false;
          this.errorModal = err?.error?.error || 'Erro ao cancelar agendamento.';
        }
      });
  }

  submitEdit() {
    if (this.editForm.invalid || !this.selectedAppt) return;
    this.loadingModal = true;
    this.errorModal = '';
    this.appointmentService.updateAppointment(this.selectedAppt.id, this.editForm.value)
      .subscribe({
        next: () => {
          this.loadingModal = false;
          this.closeModal();
          this.loadMyAppointments(this.currentPage);
        },
        error: err => {
          this.loadingModal = false;
          this.errorModal = err?.error?.error || 'Erro ao editar agendamento.';
        }
      });
  }


}
