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
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddReceitaComponent } from "../add-receita/add-receita.component";


interface Grupo {
    name: string;
    code: string;
}

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CalendarModule, FormsModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    CheckboxModule,
    CommonModule, AddReceitaComponent],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent implements OnInit{

  constructor(private gastoService: GastoService, private messageService: MessageService, private router:Router ) {}

    private fb = inject(FormBuilder);
    // private mensagemService = inject(MensagemService);

  date_start: Date | undefined;

  date_end: Date | undefined;

  grupos: Grupo[] | undefined;

  selectedGrupos: Grupo[] | undefined;

  status: Grupo[] | undefined;

  formGroupGasto!: FormGroup;
  categoriaSaldo: any[]=[];
  totalReceitas: any=[]=[];
  totalDespesas: any[]=[];
  saldoDispivel: any[]=[];

  selectedStatus: Grupo[] | undefined;
  visibleDialog: boolean = false;
  selectedParcelado:boolean=false;
  visibleModalNovaReceita: boolean=false;

  checkdParcelado(){
    this.selectedParcelado= !this.selectedParcelado

  }


  showDialog(){
    this.visibleDialog = true;

  }

  showToastSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }


getResumoCategoria(){
  this.gastoService.resumoGastos().subscribe({
      next: (response) => {

        console.log('resumo=>',  response)
      },
      error: (error) => {
      console.error('Verique a API:', error);
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Problema ao reesgatar dados. Por favor, tente novamente.', life:1500 });

    }
  })
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
    categoria: this.formGroupGasto?.value.categoria?.name,
    valor: Number(this.formGroupGasto?.value.valor),
    total_parcelas: this.formGroupGasto?.value.otal_parcelas,
    parcela_atual: this.formGroupGasto?.value.parcela_atual,
    descricao: this.formGroupGasto?.value.descricao,
    data_gasto: dataFormatada,
  };

  console.log(dtoRegistro)

  this.gastoService.criarGasto(dtoRegistro).subscribe({
    next: (response) => {
      // Verificação robusta de sucesso (pode ser response ou checar status HTTP dependendo do seu backend)


      // Correção: Chamada direta sem setInterval e padronização do nome do serviço
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro salvo com sucesso!', life:1500 });

      this.visibleDialog = false; // Fecha o diálogo após o registro bem-sucedido
      this.formGroupGasto.reset(); // Limpa o formulário após o registro
      this.router.navigate(['/dashboard'])

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
        data_gasto: ['', [Validators.required]],
        eh_parcelado: [''],
        total_parcelas: [''],
        parcela_atual:['']
      });
    }

    showDialogReceita(){
      this.visibleModalNovaReceita=true
    }



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

    this.getResumoCategoria();


  }

}
