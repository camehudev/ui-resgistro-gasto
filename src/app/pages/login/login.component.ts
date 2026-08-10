<<<<<<< HEAD
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
=======
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importação essencial
>>>>>>> b861126 (Atualização page login)
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { AuthService } from '../../services/auth.service';
=======

>>>>>>> b861126 (Atualização page login)

@Component({
  selector: 'app-login',
  standalone: true,
<<<<<<< HEAD
  imports: [DividerModule, ButtonModule, InputTextModule, ReactiveFormsModule],
=======
  imports: [DividerModule, ButtonModule, InputTextModule, ReactiveFormsModule,],
>>>>>>> b861126 (Atualização page login)
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
<<<<<<< HEAD
  // Utilizando injeção moderna via inject() de forma padronizada
  private router = inject(Router);
  private authService = inject(AuthService);
=======
>>>>>>> b861126 (Atualização page login)

  formGroup!: FormGroup;

<<<<<<< HEAD
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
=======
  formGroup!: FormGroup;

  showDashboard() {
    // Implement your logic to show the dashboard here
    //this.router.navigate(['/dashboard']);
    console.log(this.formGroup.value);
  }

  ngOnInit() {
        this.formGroup = new FormGroup({
            username: new FormControl<string | null>(null),
            password: new FormControl<string | null>(null)
        });
    }

>>>>>>> b861126 (Atualização page login)
}
