import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importação essencial
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}

  showDashboard() {
    // Implement your logic to show the dashboard here
    this.router.navigate(['/dashboard']);
  }

}
