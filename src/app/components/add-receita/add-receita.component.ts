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
    TableModule,],
  templateUrl: './add-receita.component.html',
  styleUrl: './add-receita.component.css'
})
export class AddReceitaComponent implements OnInit {

    constructor(private receitas: ReceitaService){}

    recebimentos: any[]=[];

    getAllRecebimentos(){
    this.receitas.listarTodas().subscribe(
      (res)=>{
        this.recebimentos = res;
        console.log(this.recebimentos.length)


      }
    )

  }

  ngOnInit(): void {
    this.getAllRecebimentos();

  }




}
