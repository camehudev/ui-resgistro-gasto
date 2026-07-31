import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsResumoComponent } from './cards-resumo.component';

describe('CardsResumoComponent', () => {
  let component: CardsResumoComponent;
  let fixture: ComponentFixture<CardsResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsResumoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
