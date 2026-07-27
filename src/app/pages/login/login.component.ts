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
    // Implement your logic to show the dashboard here
    //this.router.navigate(['/dashboard']);
    this.loginService.login(this.formGroup.value).subscribe(
      (response) => {
        // Navigate to the dashboard or another page after successful login
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
        // Handle login error (e.g., show an error message)
      }
    );
  }

  ngOnInit() {
        this.formGroup = new FormGroup({
            email: new FormControl<string | null>(null),
            senha: new FormControl<string | null>(null)
        });
    }

}
