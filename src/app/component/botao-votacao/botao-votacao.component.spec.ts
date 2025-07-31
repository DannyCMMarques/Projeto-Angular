import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoVotacaoComponent } from './botao-votacao.component';

describe('BotaoVotacaoComponent', () => {
  let component: BotaoVotacaoComponent;
  let fixture: ComponentFixture<BotaoVotacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoVotacaoComponent]
    });
    fixture = TestBed.createComponent(BotaoVotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
