import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedComponentModule } from '../../component/shared-component.module';
import { mockSessoesIniciadas } from '../../utils/mock/SessaoMock';
import { VotacaoComponent } from './votacao.component';

describe('VotacaoComponent', () => {
  let component: VotacaoComponent;
  let fixture: ComponentFixture<VotacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentModule],
      declarations: [VotacaoComponent],
    });
    fixture = TestBed.createComponent(VotacaoComponent);
    component = fixture.componentInstance;

    component.sessao = mockSessoesIniciadas[0];

    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
