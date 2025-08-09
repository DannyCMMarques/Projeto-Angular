import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasVotosComponent } from './estatisticas-votos.component';

describe('EstatisticasVotosComponent', () => {
  let component: EstatisticasVotosComponent;
  let fixture: ComponentFixture<EstatisticasVotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstatisticasVotosComponent]
    });
    fixture = TestBed.createComponent(EstatisticasVotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
