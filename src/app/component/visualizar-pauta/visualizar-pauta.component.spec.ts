import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPautaComponent } from './visualizar-pauta.component';

describe('VisualizarPautaComponent', () => {
  let component: VisualizarPautaComponent;
  let fixture: ComponentFixture<VisualizarPautaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarPautaComponent]
    });
    fixture = TestBed.createComponent(VisualizarPautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
