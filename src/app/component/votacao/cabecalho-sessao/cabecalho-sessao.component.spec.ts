import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoSessaoComponent } from './cabecalho-sessao.component';

describe('CabecalhoSessaoComponent', () => {
  let component: CabecalhoSessaoComponent;
  let fixture: ComponentFixture<CabecalhoSessaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabecalhoSessaoComponent]
    });
    fixture = TestBed.createComponent(CabecalhoSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
