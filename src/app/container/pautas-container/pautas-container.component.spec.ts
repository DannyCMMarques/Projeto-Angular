import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PautasContainerComponent } from './pautas-container.component';

describe('PautasContainerComponent', () => {
  let component: PautasContainerComponent;
  let fixture: ComponentFixture<PautasContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PautasContainerComponent]
    });
    fixture = TestBed.createComponent(PautasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
