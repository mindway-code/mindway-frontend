import { Component, OnInit } from "@angular/core";
import { User } from "../../../api/interfaces/user";
import { TherapistUserService } from "../../../services/therapist-user.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-association',
  standalone: false,
  templateUrl: './association.component.html',
  styleUrl: './association.component.scss'
})
export class AssociationComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUserIds: string[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  message: string = '';
  associatedUsers: User[] = [];

  constructor(
    private userService: UserService,
    private therapistUserService: TherapistUserService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchAssociatedUsers();
  }

  fetchUsers(): void {
    this.userService.getPacientes().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.users = res;
        } else if (res && Array.isArray(res.users)) {
          this.users = res.users;
        } else {
          this.users = [];
        }
        this.filterUsers();
      },
      error: () => this.message = 'Erro ao carregar usuários.'
    });
  }

  fetchAssociatedUsers(): void {
    this.therapistUserService.getAssociatedUsers().subscribe({
      next: (users: any) => {
        if (Array.isArray(users)) {
          this.associatedUsers = users;
        } else if (users && Array.isArray(users.data)) {
          this.associatedUsers = users.data;
        } else {
          this.associatedUsers = [];
        }
      },
      error: () => {
        this.associatedUsers = [];
      }
    });
  }

  filterUsers(page: number = 1): void {
    const term = this.searchTerm.trim();
    if (!term) {
      this.filteredUsers = this.users;
    } else {
      this.userService.searchAllUsersByName(term, page, 5).subscribe({
        next: (results: any) => {
          if (Array.isArray(results)) {
            this.filteredUsers = results;
          } else if (results && Array.isArray(results.users)) {
            this.filteredUsers = results.users;
          } else {
            this.filteredUsers = [];
          }
        },
        error: () => {
          this.filteredUsers = [];
        }
      });
    }
  }

  onSearchTermChange(): void {
    this.filterUsers();
  }

  toggleUserSelection(userId: string): void {
    if (this.selectedUserIds.includes(userId)) {
      this.selectedUserIds = this.selectedUserIds.filter(id => id !== userId);
    } else {
      this.selectedUserIds = [...this.selectedUserIds, userId];
    }
  }

  associateUsers(): void {
    if (this.selectedUserIds.length === 0) {
      this.message = 'Selecione pelo menos um paciente.';
      return;
    }
    this.loading = true;
    let completed = 0;
    let errors = 0;
    this.selectedUserIds.forEach(userId => {
      this.therapistUserService.associateUserToTherapist(userId).subscribe({
        next: () => {
          completed++;
          if (completed + errors === this.selectedUserIds.length) {
            this.loading = false;
            this.message = errors === 0
              ? 'Pacientes associados com sucesso!'
              : `Alguns pacientes não foram associados (${errors} erro(s)).`;
            this.selectedUserIds = [];
            this.fetchAssociatedUsers();
          }
        },
        error: () => {
          errors++;
          if (completed + errors === this.selectedUserIds.length) {
            this.loading = false;
            this.message = errors === 0
              ? 'Pacientes associados com sucesso!'
              : `Alguns pacientes não foram associados (${errors} erro(s)).`;
            this.selectedUserIds = [];
            this.fetchAssociatedUsers();
          }
        }
      });
    });
  }
}
