import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { GastoService } from '../../services/gasto.service';
import { Router } from '@angular/router';
import { MensagemService } from '../../services/mensagem.service';
import e from 'express';


interface Grupo {
    name: string;
    code: string;
}

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CalendarModule, FormsModule, DropdownModule, DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule, ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent implements OnInit{

  constructor(private gastoService: GastoService, private messageService: MensagemService) {}

    private fb = inject(FormBuilder);
    private mensagemService = inject(MensagemService);

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



// Converte a data para o formato de string YYYY-MM-DD de forma segura


  registraGasto(){
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
      data_gasto: dataFormatada};

    this.gastoService.criarGasto(dtoRegistro).subscribe({
      next: (response) => {
        if(response && response.id) {
          setInterval(() => {
            this.messageService.sucesso('Gasto registrado com sucesso!');

          }, 1000);

          this.visibleDialog = false; // Fecha o diálogo após o registro bem-sucedido
          this.formGroupGasto.reset(); // Limpa o formulário após o registro

        }else {
          this.mensagemService.erro('Problema ao registar este gasto. Por favor, tente novamente.');
        }
      },
      error: (error) => {
        this.mensagemService.erro(`Problema ao registar este gasto. Contate o administrador - ${error}`);
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
