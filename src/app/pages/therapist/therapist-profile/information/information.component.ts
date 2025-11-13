import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { firstValueFrom, Subject, Subscription } from 'rxjs';
import { User } from '../../../../api/interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { countryList } from '../../../profile/edit-profile/country';
@Component({
  selector: 'app-information',
  standalone: false,
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  infoForm!: FormGroup;
  saving = false;
  successMessage = '';
  errorMessage = '';
  userLogged!: User;
  countrySearchTerm = '';
  loading = true;

  certificates = [
    { url: 'assets/certificados/curso1.pdf', name: 'Curso Terapia Cognitiva', type: 'pdf' },
    { url: 'assets/certificados/cert2.jpg', name: 'Palestra Saúde Mental', type: 'img' }
  ];

  showEditModal = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.authService.getMe().subscribe({
      next: user => {
        this.userLogged = user;
        this.initForm();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar informações.';
        this.loading = false;
      }
    });
  }

  initForm() {
    this.infoForm = this.fb.group({
      name: [this.userLogged.name || '', [Validators.required, Validators.minLength(2)]],
      surname: [this.userLogged.surname || ''],
      email: [{ value: this.userLogged.email, disabled: true }, [Validators.required, Validators.email]],
      contact: this.fb.group({
        telephone: [this.userLogged.contact?.telephone || ''],
        smartphone: [this.userLogged.contact?.smartphone || '']
      }),
      address: this.fb.group({
        address_name: [this.userLogged.address?.address_name || ''],
        address_number: [this.userLogged.address?.address_number || ''],
        cep: [this.userLogged.address?.cep || ''],
        country: [this.userLogged.address?.country || ''],
        state: [this.userLogged.address?.state || ''],
        city: [this.userLogged.address?.city || '']
      })
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get filteredCountries(): string[] {
    if (!this.countrySearchTerm) return countryList;
    const term = this.countrySearchTerm.toLowerCase();
    return countryList.filter(c => c.toLowerCase().includes(term));
  }

  onSave() {
    if (this.infoForm.invalid) {
      this.infoForm.markAllAsTouched();
      return;
    }
    if (!this.userLogged.id) {
      this.errorMessage = 'ID do usuário não encontrado.';
      return;
    }
    const updated = this.infoForm.getRawValue();
    this.userService.updateUser(this.userLogged.id, updated).subscribe({
      next: (newUser) => {
        this.userLogged = newUser;
        this.successMessage = 'Perfil atualizado!';
      },
      error: () => {
        this.errorMessage = 'Erro ao salvar, tente novamente.';
      }
    });
  }


  onCancel() {
    if (this.userLogged) {
      this.initForm();
      this.infoForm.markAsPristine();
      this.successMessage = '';
      this.errorMessage = '';
    } else {
      this.infoForm.reset();
    }
    this.closeEditModal();
  }

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  onUploadCert(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const url = e.target.result;
      const ext = file.name.split('.').pop()?.toLowerCase();
      const type = ext === 'pdf' ? 'pdf' : 'img';
      this.certificates.push({ url, name: file.name, type });
    };
    reader.readAsDataURL(file);
  }

  onModalBgClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-bg')) {
      this.closeEditModal();
    }
  }


}
