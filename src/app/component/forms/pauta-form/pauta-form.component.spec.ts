import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PautaFormComponent } from './pauta-form.component';

describe('PautaFormComponent', () => {
  let component: PautaFormComponent;
  let fixture: ComponentFixture<PautaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PautaFormComponent]
    });
    fixture = TestBed.createComponent(PautaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
