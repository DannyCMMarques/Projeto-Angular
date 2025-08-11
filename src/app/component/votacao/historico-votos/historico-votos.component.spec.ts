import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockVotos } from '../../../utils/mock/VotoMock';
import { SharedComponentModule } from '../../shared-component.module';
import { HistoricoVotosComponent } from './historico-votos.component';

describe('HistoricoVotosComponent', () => {
  let component: HistoricoVotosComponent;
  let fixture: ComponentFixture<HistoricoVotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentModule],
      declarations: [HistoricoVotosComponent],
    });
    fixture = TestBed.createComponent(HistoricoVotosComponent);
    component = fixture.componentInstance;

    component.votos = mockVotos;

    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
