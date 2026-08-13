import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AddReceitaComponent } from '../../components/add-receita/add-receita.component';
import { GastoService } from '../../services/gasto.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { TableGastosComponent } from '../../components/table-gastos/table-gastos.component';

interface Grupo {
    name: string;
    code: string;
}

@Component({
  selector: 'app-consumo',
  standalone: true,
  imports: [CalendarModule, FormsModule,
      DropdownModule,
      DialogModule,
      ButtonModule,
      InputTextModule,
      ReactiveFormsModule,
      ToastModule,
      CheckboxModule,
      CommonModule,
      TableGastosComponent],
  templateUrl: './consumo.component.html',
  styleUrl: './consumo.component.css'
})
export class ConsumoComponent implements OnInit {
  @ViewChild(TableGastosComponent) tableGastosComponent!: TableGastosComponent;

  visibleDialogRegistro:boolean=false

  ngOnInit(): void {

    this.formGroupGasto = new FormGroup({
               categoria: new FormControl<string | null>(null),
               valor: new FormControl<string | null>(null),
               descricao: new FormControl<string | null>(null),
               data_gasto: new FormControl<Date | null>(null),
              eh_parcelado: new FormControl<string | null>(null),
              total_parcelas: new FormControl<string | null>(null),
              parcela_atual: new FormControl<string | null>(null)

           });

        this. categoriaSaldo=[
          {id:1, name:"Moradia"},
          {id:2, name:"Mercado & Feira"},
          {id:3, name:"Saúde & Bem-estar"},
          {id:4, name:"Mobilidade"},
          {id:5, name:"Rolês & Restaurantes"},
          {id:6, name:"Futuro & Reservas"},
          {id:7, name:"Outros / Imprevistos"},
          {id:8, name:"Prove Sabor"},
      ];

  }


   private fb = inject(FormBuilder);
      // private mensagemService = inject(MensagemService);

    date_start: Date | undefined;

    date_end: Date | undefined;

    grupos: Grupo[] | undefined;

    selectedGrupos: Grupo[] | undefined;

    status: Grupo[] | undefined;

    formGroupGasto!: FormGroup;
    categoriaSaldo: any[]=[];

    selectedStatus: Grupo[] | undefined;
    visibleDialog: boolean = false;
    selectedParcelado:boolean=false;
    visibleModalNovaReceita: boolean=false;

    checkdParcelado(){
      this.selectedParcelado= !this.selectedParcelado
      console.log();
    }


    showDialog(){
      this.visibleDialogRegistro = true;

    }

    showToastSuccess() {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      }

  constructor(private gastoService: GastoService, private messageService: MessageService, private router:Router ) {}


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
    categoria: this.formGroupGasto?.value.categoria?.name,
    valor: Number(this.formGroupGasto?.value.valor),
    total_parcelas: this.formGroupGasto?.value.total_parcelas?this.formGroupGasto?.value.total_parcelas:0,
    parcela_atual: this.formGroupGasto?.value.parcela_atual?this.formGroupGasto?.value.parcela_atual:0,
    descricao: this.formGroupGasto?.value.descricao,
    data_gasto: dataFormatada,
  };

  console.log(dtoRegistro)

  this.gastoService.criarGasto(dtoRegistro).subscribe({
    next: (response) => {
      // Verificação robusta de sucesso (pode ser response ou checar status HTTP dependendo do seu backend)
      console.log('Passou no next! Tentando disparar o toast...');

      // Correção: Chamada direta sem setInterval e padronização do nome do serviço
      this.visibleDialog = false; // Fecha o diálogo após o registro bem-sucedido
      this.formGroupGasto.reset(); // Limpa o formulário após o registro
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro salvo com sucesso!', life:1500 });
      this.tableGastosComponent.listarGastos();

      // Opcional: Atualizar a lista de gastos na tela aqui se necessário
    },
    error: (error) => {
      console.error('Erro ao registrar gasto:', error);
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Problema ao registrar este gasto. Por favor, tente novamente.', life:1500 });

    }
  });
}

}
