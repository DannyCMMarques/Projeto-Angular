import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotoItemComponent } from './voto-item.component';

describe('VotoItemComponent', () => {
  let component: VotoItemComponent;
  let fixture: ComponentFixture<VotoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotoItemComponent]
    });
    fixture = TestBed.createComponent(VotoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
