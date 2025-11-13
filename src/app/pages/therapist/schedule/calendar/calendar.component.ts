import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentsService } from '../../../../services/appointment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserPage, UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();

  appointments: Appointment[] = [];
  daysMatrix: { date: Date, isCurrentMonth: boolean }[][] = [];

  showDayModal = false;
  selectedDay!: Date;
  appointmentsOfDay: Appointment[] = [];
  appointmentForm!: FormGroup;
  creating = false;
  createError = '';
  showCreateForm = false;

  userSearchTerm = '';
  userSearchResults: any[] = [];
  userSearchLoading = false;
  selectedUser: any = null;
  userId = ''; // Initialize with a default value

  weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private appointmentService: AppointmentsService,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe({
      next: (res) => {
        if (res?.id) this.userId = String(res.id);
      },
      error: (error) => {
        console.error('Error loading user:', error);
      }
    });

  }

  ngOnInit() {
    this.generateMonthMatrix();
    this.loadAppointments();
  }

  /** Navega para o mês anterior */
  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateMonthMatrix();
    this.loadAppointments();
  }

  /** Navega para o próximo mês */
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateMonthMatrix();
    this.loadAppointments();
  }

  /** Monta a matriz dos dias do mês (para grid semanal) */
  generateMonthMatrix() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const weeks: { date: Date, isCurrentMonth: boolean }[][] = [];
    let week: { date: Date, isCurrentMonth: boolean }[] = [];

    let date = new Date(firstDayOfMonth);
    date.setDate(date.getDate() - date.getDay());

    while (date <= lastDayOfMonth || week.length < 7) {
      for (let i = 0; i < 7; i++) {
        week.push({
          date: new Date(date),
          isCurrentMonth: date.getMonth() === this.currentMonth
        });
        date.setDate(date.getDate() + 1);
      }
      weeks.push(week);
      week = [];
      if (date > lastDayOfMonth && date.getDay() === 0) break;
    }
    this.daysMatrix = weeks;
  }

  errorMsg!: string;
  teste() {
    this.appointmentService.getAppointmentsByUser(1 , 10)
      .subscribe({
        next: apps => {
          console.log('Apps completos:', apps);
          this.appointments = apps.data;
          console.log('Agendamentos carregados:', this.appointments);
        },
        error: () => this.errorMsg = 'Erro ao carregar agendamentos.'
      });
  }

  loadAppointments() {
    const monthStr = (this.currentMonth + 1).toString().padStart(2, '0');
    const yearStr = this.currentYear.toString();
    this.appointmentService.getAppointmentsByTherapist(1, 500).subscribe(page => {
      this.appointments = page.data.filter(a =>
        a.date.startsWith(`${yearStr}-${monthStr}`)
      );
    });
  }

  hasAppointment(date: Date): boolean {
    const dayStr = date.toISOString().slice(0, 10);
    const appt = this.appointments.some(app => app.date === dayStr);;
    // console.log('Tem???',appt)
    return this.appointments.some(app => app.date === dayStr);
  }

  getAppointmentsByDay(date: Date): Appointment[] {
    const dayStr = date.toISOString().slice(0, 10);
    return this.appointments.filter(app => app.date === dayStr);
  }


  openDayModal(date: Date) {
    if (!date) return;
    this.selectedDay = new Date(date);
    this.loadAppointmentsOfDay();
    // this.teste();
    this.buildForm();
    this.showDayModal = true;
    this.createError = '';
    this.showCreateForm = false;
  }


  openCreateForm() {
    this.showCreateForm = true;
  }

  closeDayModal() {
    this.showDayModal = false;
    this.selectedDay = undefined!;
    this.appointmentsOfDay = [];
    this.appointmentForm.reset();
    this.showCreateForm = false;
  }

  loadAppointmentsOfDay() {
    const dayStr = this.selectedDay.toISOString().slice(0, 10);
    this.appointmentService.getAppointmentsByDate(dayStr).subscribe(result => {
      this.appointmentsOfDay = result.data;
    });
  }

  buildForm() {
    this.appointmentForm = this.fb.group({
      patient_id: ['', Validators.required],
      provider_id: this.userId,
      time: ['', Validators.required],
      status: ['PENDENTE'],
      note: ['']
    });
  }

  submitAppointment() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }
    this.creating = true;
    this.createError = '';

    const payload = {
      ...this.appointmentForm.value,
      date: this.selectedDay.toISOString().slice(0, 10),
    };

    this.appointmentService.createAppointment(payload).subscribe({
      next: (appt) => {
        this.creating = false;
        this.showDayModal = false;
        this.loadAppointments();
        setTimeout(() =>
          window.location.reload()
        , 1550);

        this.openDayModal(this.selectedDay)
      },
      error: err => {
        this.creating = false;
        this.createError = err?.error?.error || 'Erro ao criar agendamento.';
      }
    });
  }


  onUserSearch(term: string) {
    this.userSearchTerm = term;
    if (!term || term.length < 2) {
      this.userSearchResults = [];
      return;
    }
    this.userSearchLoading = true;
    this.userService.searchUsersByName(term, 1, 6)
      .subscribe({
        next: (page: UserPage) => {
          this.userSearchResults = page.users;
          this.userSearchLoading = false;
        },
        error: () => {
          this.userSearchResults = [];
          this.userSearchLoading = false;
        }
      });
  }

  selectUserFromSearch(user: any) {
    this.selectedUser = user;
    this.appointmentForm.patchValue({ patient_id: user.id });
    this.userSearchResults = [];
    this.userSearchTerm = user.name + (user.surname ? ' ' + user.surname : '');
  }

  clearUserSearch() {
    this.selectedUser = null;
    this.appointmentForm.patchValue({ patient_id: '' });
    this.userSearchTerm = '';
    this.userSearchResults = [];
  }

  clearUserSearchResults() {
    setTimeout(() => {
      this.userSearchResults = [];
    }, 200);
  }
}
