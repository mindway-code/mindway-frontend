import { Component, OnInit, OnDestroy } from '@angular/core';
import { AttendanceService, Attendance } from '../../../services/attendance.service';
import { User } from '../../../api/interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { TherapistUserService } from '../../../services/therapist-user.service';
import { Task, TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-attendance',
  standalone: false,
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  therapistId: string = '';
  associatedPatients: User[] = [];
  selectedPatient: User | null = null;

  attendanceId: number | null = null;
  attendance: Attendance | null = null;

  loadingPatients = false;
  loadingAttendance = false;

  started = false;
  finished = false;
  timer: any;
  timerDisplay = "00:00:00";
  startTimestamp: number = 0;

  summary: string = '';

  attendances: Attendance[] = [];
  tasksMap: { [key: number]: Task[] } = {};
  expandedAttendanceId: number | null = null;

  constructor(
    private attendanceService: AttendanceService,
    private therapistUser: TherapistUserService,
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.therapistId = this.authService.currentUserId || '';
    this.fetchAssociatedPatients();
  }

  fetchAssociatedPatients() {
    this.loadingPatients = true;
    this.therapistUser.getAssociatedUsers().subscribe({
      next: (users: any) => {
        if (Array.isArray(users)) {
          this.associatedPatients = users;
          this.loadingPatients = false;
        } else if (users && Array.isArray(users.data)) {
          this.associatedPatients = users.data;
          this.loadingPatients = false;
        } else {
          this.associatedPatients = [];
          this.loadingPatients = false;
        }
      },
      error: () => {
        this.associatedPatients = [];
        this.loadingPatients = false;
      }
    });
  }

  // Modifique selectPatient:
  selectPatient(user: User) {
    this.selectedPatient = user;
    this.attendance = null;
    this.attendanceId = null;
    this.started = false;
    this.finished = false;
    this.timerDisplay = "00:00:00";
    this.loadAttendancesForPatient(user.id);
  }
  startAttendance() {
    const now = new Date().toISOString();
    const payload = {
      therapist_id: this.therapistId,
      user_id: this.selectedPatient?.id,
      started_at: now,
      summary: this.summary,
    };

    this.attendanceService.create(payload).subscribe(att => {
      this.attendance = att;
      this.attendanceId = att.id;
      this.started = true;
      this.startTimer(new Date(att.started_at!).getTime());
    });
  }

  endAttendance() {
    if (!this.attendanceId) return;
    const now = new Date().toISOString();
    this.attendanceService.update(this.attendanceId, { ended_at: now }).subscribe(att => {
      this.attendance = att;
      this.finished = true;
      this.stopTimer();
    });
  }

  startTimer(start: number) {
    this.startTimestamp = start;
    this.stopTimer();
    this.timer = setInterval(() => {
      const diff = Date.now() - this.startTimestamp;
      this.timerDisplay = this.formatTime(diff);
    }, 1000);
  }

  stopTimer() {
    if (this.timer) clearInterval(this.timer);
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  // Chame ao selecionar paciente:
  loadAttendancesForPatient(patientId?: string) {
    this.attendanceService.getAttendances({ user_id: patientId, therapist_id: this.therapistId, pageSize: 10, page: 1 })
      .subscribe(resp => {
        this.attendances = resp.data;
      });
  }

  // Quando expandir um atendimento:
  expandAttendance(attendanceId: number) {
    if (this.expandedAttendanceId === attendanceId) {
      this.expandedAttendanceId = null;
      return;
    }
    this.expandedAttendanceId = attendanceId;
    this.taskService.getTasks({ attendance_id: attendanceId, pageSize: 50 }).subscribe(resp => {
      this.tasksMap[attendanceId] = resp.data;
    });
  }

}
