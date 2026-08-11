import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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

  constructor(private receitas: ReceitaService){}

  recebimentos: Receita[]=[];
  visibleDialogRecebimento:boolean=false
  formGroupReceitas!: FormGroup;
  categoriaReceitas:any[]=[];
   private fb = inject(FormBuilder);

    addRecebimento(){
      console.log(this.formGroupReceitas.value)
    // const dto={
    //   categoria:this.formGroupReceitas.categoria,
    //   descricao:this.formGroupReceitas.descricao,
    //   valor:this.formGroupReceitas.valor,
    //   data:this.formGroupReceitas.data_recebimento
    // }
    // this.receitas.salvar(dto).subscribe(
    //   res=>{
    //      console.log( 'salvo com sucesso => ',res)

    //   }
    // )

  }

  getRecebimentos(){

    this.receitas.listarTodas().subscribe(
      res=>{
         console.log( 'salvo com sucesso => ',res)

      }
    )

  }

  ngOnInit(): void {
     this.formGroupReceitas = new FormGroup({
        categoria: new FormControl<string | null>(null),
        descricao: new FormControl<string | null>(null),
        valor: new FormControl<string | null>(null),
        data_recebimento: new FormControl<Date | null>(null),

      });

      this. categoriaReceitas=[
          {id:1, name:"Salário"},
          {id:2, name:"outros"},
          {id:3, name:"Prove sabor"},
      ];

      //this.getRecebimentos();

  }

  showDialogRecebimento(){
    this.visibleDialogRecebimento = true
  }

  registrarParcelamento(){

  }

}
