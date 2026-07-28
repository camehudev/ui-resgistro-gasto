import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu'; // Ou o módulo do PrimeNG que estiver usando para o menu
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';



@Component({
  selector: 'app-menu-bar',
  standalone: true,
   imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, TableModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})

export class MenuBarComponent {
   private authService = inject(AuthService);

// Tipagem forte com MenuItem[]
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: ['/dashboard'] // Dica: Adicionei o routerLink para a Home se desejar navegação
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      routerLink: ['/usuarios']
    },
    {
      label: 'Relatorios',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Core',
          icon: 'pi pi-bolt',

        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',

        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',

        },
        {
          separator: true
        },
        {
          label: 'Templates',
          icon: 'pi pi-palette',
          items: [
            {
              label: 'Apollo',
              icon: 'pi pi-palette',
              badge: '2'
            },
            {
              label: 'Ultima',
              icon: 'pi pi-palette',

            }
          ]
        }
      ]
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
      badge: '3'
    }
  ];


  fazerLogout() {
    this.authService.logout().subscribe({
      next: () => window.location.href = '/login',
      error: () => window.location.href = '/login'
    });
  }

}
