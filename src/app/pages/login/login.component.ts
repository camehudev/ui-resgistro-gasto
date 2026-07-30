import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importação essencial
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: AuthService) {}

  formGroup!: FormGroup;

 showDashboard() {
    this.loginService.login(this.formGroup.value).subscribe({
      next: (response) => {

        // Navega para o dashboard após o sucesso no login
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Trate o erro aqui (ex: exibir mensagem amigável para o usuário)
      }
    });
  }

  ngOnInit() {
        this.formGroup = new FormGroup({
            email: new FormControl<string | null>(null),
            senha: new FormControl<string | null>(null)
        });
    }

}
