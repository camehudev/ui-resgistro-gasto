import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ReceitaService } from '../../services/receitas.service';

@Component({
  selector: 'app-add-receita',
  standalone: true,
  imports: [
    CurrencyPipe,
    InputTextModule,
    RippleModule,
    CommonModule,
    TableModule
  ],
  templateUrl: './add-receita.component.html',
  styleUrl: './add-receita.component.css'
})
export class AddReceitaComponent implements OnInit {

  recebimentos: any[] = [];

  constructor(private receitasService: ReceitaService) {}

  ngOnInit(): void {
    this.getAllRecebimentos();
  }

  // Método público para recarregar a tabela sob demanda
  getAllRecebimentos(){
    this.receitasService.listarTodas().subscribe({
      next: (res) => {
        this.recebimentos = res;
        console.log('Total de registros carregados:', this.recebimentos.length);
      },
      error: (err) => console.error('Erro ao buscar receitas:', err)
    });
  }
}
