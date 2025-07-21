import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesResumoComponent } from './informacoes-resumo.component';

describe('InformacoesResumoComponent', () => {
  let component: InformacoesResumoComponent;
  let fixture: ComponentFixture<InformacoesResumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacoesResumoComponent]
    });
    fixture = TestBed.createComponent(InformacoesResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
