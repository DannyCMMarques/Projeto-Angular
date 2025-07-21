import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessoesComponent } from './sessoes.component';

describe('SessoesComponent', () => {
  let component: SessoesComponent;
  let fixture: ComponentFixture<SessoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessoesComponent]
    });
    fixture = TestBed.createComponent(SessoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
