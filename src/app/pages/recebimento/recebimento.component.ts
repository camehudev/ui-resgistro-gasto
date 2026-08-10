import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-recebimento',
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
        ],
  templateUrl: './recebimento.component.html',
  styleUrl: './recebimento.component.css'
})
export class RecebimentoComponent implements OnInit {

  ngOnInit(): void {

  }

  visibleDialogRecebimento:boolean=false
  formGroupGasto!: FormGroup;
  categoriaSaldo:any[]=[];

  showDialogRecebimento(){
    this.visibleDialogRecebimento = true
  }

  registrarParcelamento(){

  }

}
