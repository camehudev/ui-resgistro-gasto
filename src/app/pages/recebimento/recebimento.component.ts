import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core'; // Adicionado ViewChild
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Receita } from '../../models/receita.model';
import { ReceitaService } from '../../services/receitas.service';
import { AddReceitaComponent } from '../../components/add-receita/add-receita.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recebimento',
  standalone: true,
  imports: [
    CalendarModule, FormsModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    CheckboxModule,
    CommonModule,
    AddReceitaComponent
  ],
  templateUrl: './recebimento.component.html',
  styleUrl: './recebimento.component.css'
})
export class RecebimentoComponent implements OnInit {

  // Referência direta ao componente filho para poder chamar métodos dele
  @ViewChild(AddReceitaComponent) tabelaReceitaComponent!: AddReceitaComponent;

  constructor(private receitasService: ReceitaService, private messageService: MessageService){}

  visibleDialogRecebimento: boolean = false;
  formGroupReceitas!: FormGroup;
  categoriaReceitas: any[] = [];
  private fb = inject(FormBuilder);

  addRecebimento(){
    const dto = {
      categoria: this.formGroupReceitas.value.categoria.name,
      descricao: this.formGroupReceitas.value.descricao,
      valor: this.formGroupReceitas.value.valor,
      data: this.formGroupReceitas.value.data_recebimento ? formatDate(this.formGroupReceitas.value.data_recebimento, 'yyyy-MM-dd', 'en-US') : ''
    };

    this.receitasService.salvar(dto).subscribe({
      next: (res) => {
        if(res.id){
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Receita salva com sucesso!' });

          // Fecha o diálogo e limpa o form
          this.visibleDialogRecebimento = false;
          this.formGroupReceitas.reset();

          // DISPARA O SINAL DIRETAMENTE PARA O FILHO ATUALIZAR A TABELA!
          if (this.tabelaReceitaComponent) {
            this.tabelaReceitaComponent.getAllRecebimentos();
          }
        }
      },
      error: (error) => {
        console.error('Erro ao registrar receita:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Problema ao registrar. Tente novamente.', life: 2500 });
      }
    });
  }

  ngOnInit(): void {
    this.formGroupReceitas = new FormGroup({
      categoria: new FormControl<string | null>(null),
      descricao: new FormControl<string | null>(null),
      valor: new FormControl<string | null>(null),
      data_recebimento: new FormControl<Date | null>(null),
    });

    this.categoriaReceitas = [
      { id: 1, name: "Salário" },
      { id: 2, name: "Outros" },
      { id: 3, name: "Prove sabor" },
    ];
  }

  showDialogRecebimento(){
    this.visibleDialogRecebimento = true;
  }
}
