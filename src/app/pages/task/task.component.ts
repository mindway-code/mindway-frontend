import { Component, OnInit } from '@angular/core';
import { TaskService, Task, TaskAttendance } from '../../services/task.service';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  attendances: TaskAttendance[] = [];
  allTasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  feedbacks: { [taskId: number]: string } = {};
  loading: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasksByUserId().subscribe(res => {
      this.attendances = res.data || [];
      this.allTasks = this.attendances.flatMap(a => a.task || []);
      this.filteredTasks = this.allTasks;
      this.loading = false;
    }, () => { this.loading = false; });
  }

  filterTasks() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredTasks = this.allTasks;
    } else {
      this.filteredTasks = this.allTasks.filter(t => (t.description || '').toLowerCase().includes(term));
    }
  }

  markCompleted(task: Task) {
    const feedback = this.feedbacks[task.id] || '';
    this.taskService.update(task.id, { status: 'done', feedback }).subscribe(() => {
      this.loadTasks();
    });
  }
}
