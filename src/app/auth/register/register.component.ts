// pages/register/register.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fullName = '';
  surname = '';
  email = '';
  password = '';
  confirmPassword = '';

  /**
   * Dispara ao submeter o formulário de cadastro.
   * @param form Instância de NgForm para validações de formulário.
   */
  onRegister(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.valid && this.password === this.confirmPassword) {

      console.log('Cadastrando usuário:', {
        fullName: this.fullName,
        email: this.email,
        password: this.password
      });
    }
  }
}
