import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarDataComponent } from './modal-visualizar-data.component';

describe('ModalVisualizarDataComponent', () => {
  let component: ModalVisualizarDataComponent;
  let fixture: ComponentFixture<ModalVisualizarDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalVisualizarDataComponent]
    });
    fixture = TestBed.createComponent(ModalVisualizarDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
