import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  // Utilizando injeção moderna via inject() de forma padronizada
  private router = inject(Router);
  private authService = inject(AuthService);

  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl<string | null>(null),
      senha: new FormControl<string | null>(null)
    });
  }

  showDashboard() {
    if (this.formGroup.invalid) return;

    this.authService.login(this.formGroup.value).subscribe({
      next: (response) => {
        console.log('RESP LOGIN : ', response);

        // O AuthService já atualiza o Signal 'isAuthenticated' internamente no pipe(tap(...))
        // Agora basta redirecionar o usuário para o dashboard com segurança
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Aqui você pode adicionar uma tratativa de erro amigável para o usuário (ex: Toast do PrimeNG)
      }
    });
  }
}
