import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  TaskService,
  Task,
  TaskListResponse
} from '../../../../services/task.service';

@Component({
  selector: 'app-therapist-task',
  standalone: false,
  templateUrl: './therapist-task.component.html',
  styleUrls: ['./therapist-task.component.scss']
})
export class TherapistTaskComponent implements OnChanges {
  @Input() attendanceId!: number;

  // Lista de tarefas
  tasks: Task[] = [];

  // Formulário de criação/edição
  newTaskDescription = '';
  newTaskDueDate = '';
  editingTask: Task | null = null;

  loading = false;

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attendanceId'] && this.attendanceId) {
      this.loadTasks();
    }
  }

  loadTasks() {
    this.loading = true;
    this.taskService
      .getTasks({ attendance_id: this.attendanceId, page: 1, pageSize: 50 })
      .subscribe({
        next: (res: TaskListResponse) => {
          this.tasks = res.data;
          this.loading = false;
        },
        error: () => (this.loading = false)
      });
  }

  createTask() {
    if (!this.newTaskDescription.trim()) return;

    this.taskService
      .create({
        attendance_id: this.attendanceId,
        description: this.newTaskDescription,
        due_date: this.newTaskDueDate || undefined,
        status: 'pending'
      })
      .subscribe(() => {
        this.newTaskDescription = '';
        this.newTaskDueDate = '';
        this.loadTasks();
      });
  }

  enableEdit(task: Task) {
    this.editingTask = { ...task };
  }

  saveEdit() {
    if (!this.editingTask) return;

    this.taskService
      .update(this.editingTask.id, {
        description: this.editingTask.description,
        due_date: this.editingTask.due_date,
        status: this.editingTask.status
      })
      .subscribe(() => {
        this.editingTask = null;
        this.loadTasks();
      });
  }

  cancelEdit() {
    this.editingTask = null;
  }

  toggleStatus(task: Task) {
    const newStatus = task.status === 'pending' ? 'done' : 'pending';

    this.taskService
      .update(task.id, { status: newStatus })
      .subscribe(() => this.loadTasks());
  }

  deleteTask(task: Task) {
    if (!confirm('Deseja realmente remover esta tarefa?')) return;

    this.taskService.delete(task.id).subscribe(() => this.loadTasks());
  }
}
