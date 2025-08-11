import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedComponentModule } from '../../component/shared-component.module';
import { SessoesComponent } from './sessoes.component';

describe('SessoesComponent', () => {
  let component: SessoesComponent;
  let fixture: ComponentFixture<SessoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentModule],
      declarations: [SessoesComponent],
    });
    fixture = TestBed.createComponent(SessoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
