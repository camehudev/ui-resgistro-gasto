import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './services/loadingService';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSub!: Subscription;

  constructor(
    private loadingService: LoadingService, // Substitua pelo tipo real do seu service
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Inscreve-se de forma segura e atualiza a propriedade de forma sincronizada com o ciclo
    this.loadingSub = this.loadingService.loading$.subscribe((status: boolean) => {
      this.isLoading = status;
      this.cdr.detectChanges(); // Garante que a mudança seja tratada no ciclo correto sem conflito
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }

}
