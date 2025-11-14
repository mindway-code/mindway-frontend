// pages/register/register.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Dispara ao submeter o formulário de cadastro.
   * @param form Instância de NgForm para validações de formulário.
   */
  onRegister(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.valid && this.password === this.confirmPassword) {
      console.log(this.name, this.surname, this.email, this.password, this.confirmPassword)
      this.authService.register(this.name, this.surname, this.email, this.password, this.confirmPassword).subscribe(
        (response) => {
          this.authService.saveToken(response.token);
          this.errorMessage = '';
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error;
          console.log(error)
        }
      );



      console.log('Cadastrando usuário:', {
        form
      });
    }
  }
}
