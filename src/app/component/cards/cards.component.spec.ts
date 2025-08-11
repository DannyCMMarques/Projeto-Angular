import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedComponentModule } from '../shared-component.module';
import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentModule],
      declarations: [CardsComponent],
    });
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;

    component.pautaTitulo = 'Teste';
    component.descricao = 'Descrição teste';
    component.status = 'NAO_VOTADA';

    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
