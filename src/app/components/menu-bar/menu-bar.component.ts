import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    DividerModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
    TableModule,
    OverlayPanelModule,
    ButtonModule,
    ListboxModule,
    RouterModule,
    DialogModule
  ],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  private authService = inject(AuthService);

  constructor(private router:Router){

  }

  visibleMenu: boolean = false;
  visibleLogout: boolean = false;

  itemsOverlay: any[] = [
    { name: 'Perfil', icon: 'pi pi-user' },
    { name: 'Configurações', icon: 'pi pi-cog' },
    { name: 'Sair', icon: 'pi pi-sign-out', command: () => this.fazerLogout() }
  ];

  // Computed Signal para reatividade instantânea no menu com base na autenticação
  items = computed<MenuItem[]>(() => {
    const logado = this.authService.isAuthenticated();

    const menuItems: MenuItem[] = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.showPageDashboard(),
      }
    ];


    if (logado) {
      menuItems.push(
        {
          label: 'Usuarios',
          icon: 'pi pi-users',
          command: () => this.showPagesUser()
        },
        {
          label: 'Relatorios',
          icon: 'pi pi-file',
          routerLink: ['/relatorios'], // Boa prática: definir rota pai se aplicável
          items: [
            { label: 'Core', icon: 'pi pi-bolt', routerLink: ['/relatorios/core'] },
            { label: 'Blocks', icon: 'pi pi-server', routerLink: ['/relatorios/blocks'] },
            { label: 'UI Kit', icon: 'pi pi-pencil', routerLink: ['/relatorios/uikit'] }
          ]
        },

        {
          label: 'Cadastrar',
          icon: 'pi pi-list-check',
          items: [
            { label: 'Recebimento', icon: 'pi pi-arrow-up', command:()=> this.showRecebimentos() },
            { label: 'Consumo', icon: 'pi pi-arrow-down', command:()=> this.showConsumo() }
          ]
        }
      );
    }

    return menuItems;
  });

   showPagesUser(){
    this.router.navigate(['/usuarios']);
   }

   showPagesRelatorios(){
    this.router.navigate(['/relatorios']);
   }

   showPageDashboard(){
    this.router.navigate(['/dashboard']);
   }

   showRecebimentos(){
    this.router.navigate(['/recebimento']);

   }

   showConsumo(){
    this.router.navigate(['/consumo']);

   }

  // Getter reativo para expor o estado de login no HTML
  get isLogado(): boolean {
    return this.authService.isAuthenticated();
  }

  showDialogLogout() {
    this.visibleLogout = true;
  }

  fazerLogout() {
    this.authService.logout().subscribe({
      next: () => window.location.href = '/login',
      error: () => window.location.href = '/login'
    });
    this.visibleMenu = false;
  }
}
