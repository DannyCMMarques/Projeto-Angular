import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedComponentModule } from '../../component/shared-component.module';
import { PautasComponent } from './pautas.component';

describe('PautasComponent', () => {
  let component: PautasComponent;
  let fixture: ComponentFixture<PautasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentModule],
      declarations: [PautasComponent],
    });
    fixture = TestBed.createComponent(PautasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
