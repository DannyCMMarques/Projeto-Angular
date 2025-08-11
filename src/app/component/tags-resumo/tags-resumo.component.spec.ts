import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedComponentModule } from '../shared-component.module';
import { TagsResumoComponent } from './tags-resumo.component';

describe('TagsResumoComponent', () => {
  let component: TagsResumoComponent;
  let fixture: ComponentFixture<TagsResumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentModule],
      declarations: [TagsResumoComponent],
    });
    fixture = TestBed.createComponent(TagsResumoComponent);
    component = fixture.componentInstance;

    component.status = 'NAO_VOTADA';
    component.exibirResultado = true;

    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
