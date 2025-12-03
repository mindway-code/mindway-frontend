import { Component, OnInit } from '@angular/core';
import { AttendanceService, Attendance } from '../../services/attendance.service';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  attendances: (Attendance & { tasks?: Task[] })[] = [];
  expanded: boolean[] = [];
  loading = false;

  constructor(
    private attendanceService: AttendanceService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadAttendances();
  }

  loadAttendances() {
    this.loading = true;
    this.attendanceService.getByUserId().subscribe(res => {
      this.attendances = res.data;
      this.expanded = this.attendances.map(() => false);
      this.mergeTasks();
      this.loading = false;
    });
  }

  mergeTasks() {
    this.attendances.forEach((att, idx) => {
      this.taskService.getTasks({ attendance_id: att.id }).subscribe(res => {
        this.attendances[idx].tasks = res.data;
      });
    });
  }

  toggleExpand(idx: number) {
    this.expanded[idx] = !this.expanded[idx];
  }

  getDuration(start: string | null, end: string | null): string {
    if (!start || !end) return '';
    const s = new Date(start);
    const e = new Date(end);
    const ms = e.getTime() - s.getTime();
    if (ms < 0) return '';
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return `${h}h ${m}min`;
  }
}
