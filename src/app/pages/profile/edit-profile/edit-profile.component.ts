import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../api/interfaces/user';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { countryList } from './country';

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user!: User;
  loading = true;
  editing = false;
  successMsg = '';
  errorMsg = '';
  profileForm!: FormGroup;
  countrySearchTerm = '';


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: user => {
        this.user = user;
        this.initForm();
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Erro ao carregar informações.';
        this.loading = false;
      }
    });
  }

  goBack() {
    window.history.back()
  }

  get filteredCountries(): string[] {
    if (!this.countrySearchTerm) return countryList;
    const term = this.countrySearchTerm.toLowerCase();
    return countryList.filter(c => c.toLowerCase().includes(term));
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [this.user.name || '', [Validators.required, Validators.minLength(2)]],
      surname: [this.user.surname || ''],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
      contact: this.fb.group({
        telephone: [this.user.contact?.telephone || ''],
        smartphone: [this.user.contact?.smartphone || '']
      }),
      address: this.fb.group({
        address_name: [this.user.address?.address_name || ''],
        address_number: [this.user.address?.address_number || ''],
        cep: [this.user.address?.cep || ''],
        country: [this.user.address?.country || ''],
        state: [this.user.address?.state || ''],
        city: [this.user.address?.city || '']
      })
    });
  }

  startEdit() {
    this.editing = true;
    this.successMsg = '';
    this.errorMsg = '';
  }

  cancelEdit() {
    this.editing = false;
    this.successMsg = '';
    this.errorMsg = '';
    this.initForm();
  }

  save() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    if (!this.user.id) {
      this.errorMsg = 'ID do usuário não encontrado.';
      return;
    }
    const updated = this.profileForm.getRawValue();
    this.userService.updateUser(this.user.id, updated).subscribe({
      next: (newUser) => {
        this.user = newUser;
        this.editing = false;
        this.successMsg = 'Perfil atualizado!';
      },
      error: () => {
        this.errorMsg = 'Erro ao salvar, tente novamente.';
      }
    });
  }
}
