import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSessaoComponent } from './visualizar-sessao.component';

describe('VisualizarSessaoComponent', () => {
  let component: VisualizarSessaoComponent;
  let fixture: ComponentFixture<VisualizarSessaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarSessaoComponent]
    });
    fixture = TestBed.createComponent(VisualizarSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
