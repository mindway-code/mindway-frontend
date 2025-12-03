// pages/register/register.component.ts

import { Component } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = '';
  surname = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Dispara ao submeter o formulário de cadastro.
   * @param form Instância de NgForm para validações de formulário.
   */
  onRegister(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.valid && this.password === this.confirmPassword) {
      this.loading = true;
      this.authService.register(this.name, this.surname, this.email, this.password, this.confirmPassword).subscribe(
        (response) => {
          this.authService.saveToken(response.token);
          this.errorMessage = '';
          this.loading = false;
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
          console.log(error)
        }
      );
    }
  }
}
