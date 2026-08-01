import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGastosComponent } from './table-gastos.component';

describe('TableGastosComponent', () => {
  let component: TableGastosComponent;
  let fixture: ComponentFixture<TableGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableGastosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
