import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociadoFormComponent } from './associado-form.component';

describe('AssociadoFormComponent', () => {
  let component: AssociadoFormComponent;
  let fixture: ComponentFixture<AssociadoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssociadoFormComponent]
    });
    fixture = TestBed.createComponent(AssociadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
