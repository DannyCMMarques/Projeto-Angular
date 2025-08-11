import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../test-utils/test-module';
import { mockSessoesIniciadas } from '../../utils/mock/SessaoMock';
import { VisualizarSessaoComponent } from './visualizar-sessao.component';

describe('VisualizarSessaoComponent', () => {
  let component: VisualizarSessaoComponent;
  let fixture: ComponentFixture<VisualizarSessaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [VisualizarSessaoComponent],
    });
    fixture = TestBed.createComponent(VisualizarSessaoComponent);
    component = fixture.componentInstance;

    component.sessao = mockSessoesIniciadas[0];

    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
