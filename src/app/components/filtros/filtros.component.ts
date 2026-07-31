import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

interface Grupo {
    name: string;
    code: string;
}

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CalendarModule, FormsModule, DropdownModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent implements OnInit{

  date_start: Date | undefined;

  date_end: Date | undefined;

  grupos: Grupo[] | undefined;

  selectedGrupos: Grupo[] | undefined;

  status: Grupo[] | undefined;

  selectedStatus: Grupo[] | undefined;

  ngOnInit(): void {
    this.grupos = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
  }

}
