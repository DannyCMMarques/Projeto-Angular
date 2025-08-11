import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../test-utils/test-module';
import { mockPautaResultados } from '../../utils/mock/PautaMock';
import { VisualizarPautaComponent } from './visualizar-pauta.component';

describe('VisualizarPautaComponent', () => {
  let component: VisualizarPautaComponent;
  let fixture: ComponentFixture<VisualizarPautaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [VisualizarPautaComponent],
    });
    fixture = TestBed.createComponent(VisualizarPautaComponent);
    component = fixture.componentInstance;

    component.pauta = mockPautaResultados[0];

    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
