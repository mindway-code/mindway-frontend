import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Para redirecionar após login bem-sucedido
import { AuthService } from '../../services/auth.service';
// import { AuthService } from '../auth.service';  // Serviço de autenticação

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}


  onSubmit(): void {
    if (this.email && this.password) {

      this.loading = true;
      console.log(this.loading);

      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          this.authService.saveToken(response.token);
          this.errorMessage = '';
          this.loading = false;
          this.router.navigate(['/']);
        },
        (error) => {
          // Caso ocorra erro no login
          this.errorMessage = 'E-mail ou senha inválidos.';
        }
      );
    }
  }
}
