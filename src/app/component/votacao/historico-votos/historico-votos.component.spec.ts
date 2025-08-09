import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoVotosComponent } from './historico-votos.component';

describe('HistoricoVotosComponent', () => {
  let component: HistoricoVotosComponent;
  let fixture: ComponentFixture<HistoricoVotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoVotosComponent]
    });
    fixture = TestBed.createComponent(HistoricoVotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
