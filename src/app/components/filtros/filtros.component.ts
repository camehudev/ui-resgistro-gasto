import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { GastoService } from '../../services/gasto.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


interface Grupo {
    name: string;
    code: string;
}

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CalendarModule, FormsModule, DropdownModule, DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule,ToastModule ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent implements OnInit{

  constructor(private gastoService: GastoService, private messageService: MessageService, ) {}

    private fb = inject(FormBuilder);
    // private mensagemService = inject(MensagemService);

  date_start: Date | undefined;

  date_end: Date | undefined;

  grupos: Grupo[] | undefined;

  selectedGrupos: Grupo[] | undefined;

  status: Grupo[] | undefined;

  formGroupGasto!: FormGroup;

  selectedStatus: Grupo[] | undefined;
  visibleDialog: boolean = false;


  showDialog(){
    this.visibleDialog = true;

  }

  showToastSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }



// Converte a data para o formato de string YYYY-MM-DD de forma segura


 registraGasto() {
  const dataBruta = this.formGroupGasto?.value.data_gasto;
  let dataFormatada = '';

  if (dataBruta) {
    const dataObj = new Date(dataBruta);
    // Garante que a data é válida antes de formatar
    if (!isNaN(dataObj.getTime())) {
      dataFormatada = dataObj.toISOString().split('T')[0];
    }
  }

  const dtoRegistro = {
    categoria: this.formGroupGasto?.value.categoria,
    valor: Number(this.formGroupGasto?.value.valor),
    descricao: this.formGroupGasto?.value.descricao,
    data_gasto: dataFormatada
  };

  this.gastoService.criarGasto(dtoRegistro).subscribe({
    next: (response) => {
      // Verificação robusta de sucesso (pode ser response ou checar status HTTP dependendo do seu backend)
      console.log('Passou no next! Tentando disparar o toast...');

      // Correção: Chamada direta sem setInterval e padronização do nome do serviço
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro salvo com sucesso!', life:1500 });

      this.visibleDialog = false; // Fecha o diálogo após o registro bem-sucedido
      this.formGroupGasto.reset(); // Limpa o formulário após o registro

      // Opcional: Atualizar a lista de gastos na tela aqui se necessário
    },
    error: (error) => {
      console.error('Erro ao registrar gasto:', error);
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Problema ao registrar este gasto. Por favor, tente novamente.', life:1500 });

    }
  });
}
  inicializarFormulario(): void {
      this.formGroupGasto = this.fb.group({
        categoria: ['', [Validators.required, Validators.minLength(3)]],
        valor: ['', [Validators.required, Validators.minLength(3)]],
        descricao: ['', [Validators.required, Validators.minLength(3)]],
        data_gasto: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.formGroupGasto = new FormGroup({
           categoria: new FormControl<string | null>(null),
           valor: new FormControl<string | null>(null),
           descricao: new FormControl<string | null>(null),
           data_gasto: new FormControl<Date | null>(null),
       });

    this.grupos = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
  }

}
